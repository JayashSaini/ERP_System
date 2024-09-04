import React, { useEffect, useState } from "react";
import { requestHandler } from "../../util";
import {
  getProfile,
  updateAvatar as updateAvatarAPI,
  updateProfile,
} from "../../api";
import { toast } from "sonner";
import { ProfileInterface } from "../../interfaces";
import { Loader } from "../../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../components";
import { TailSpin } from "react-loader-spinner";
import AvatarEditor from "react-avatar-editor";
import { IconCamera } from "@tabler/icons-react";
import { useAppSelector } from "../../hooks/UseAppSelector";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../util/schema";
import { updateAvatar } from "../../redux/slices/auth.slice";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { DepartmentsEnum } from "../../constants";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileInterface>({
    resolver: yupResolver(profileSchema as any),
  });

  const [image, setImage] = useState<File | null>(null);
  const [editor, setEditor] = useState<AvatarEditor | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const onSubmit: SubmitHandler<ProfileInterface> = async (data) => {
    // Convert date fields to a consistent format (e.g., YYYY-MM-DD)
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth ? formatDateForInput(data.dateOfBirth) : "",
      joiningDate: data.joiningDate ? formatDateForInput(data.joiningDate) : "",
    };

    requestHandler(
      async () => updateProfile(formattedData),
      setSubmitLoading,
      () => {
        toast.success("Profile updated successfully!");
      },
      (err: any) => {
        toast.error(err);
      }
    );
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setShowEditor(true);
    }
  };

  const handleSaveAvatar = async () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          const formData = new FormData();
          formData.append("avatar", blob, "avatar.png");

          requestHandler(
            async () => updateAvatarAPI(formData),
            setAvatarLoading,
            ({ data }) => {
              dispatch(updateAvatar({ user: data }));
              toast.success("Avatar updated successfully!");
              setShowEditor(false);
            },
            (err: any) => {
              toast.error(err);
            }
          );
        }
      });
    }
  };

  useEffect(() => {
    requestHandler(
      async () => getProfile(),
      setLoading,
      (res) => {
        const profile = res.data;
        const dateOfBirth = new Date(profile.dateOfBirth)
          .toISOString()
          .split("T")[0];
        const joiningDate = new Date(profile.joiningDate)
          .toISOString()
          .split("T")[0];
        setValue("firstName", profile.firstName);
        setValue("lastName", profile.lastName);
        setValue("email", profile.email);
        setValue("contactNumber", profile.contactNumber);
        setValue("email", profile.email);
        setValue("city", profile.city);
        setValue("stateProvince", profile.stateProvince);
        setValue("contactNumber", profile.contactNumber);
        setValue("dateOfBirth", dateOfBirth);
        setValue("gender", profile.gender);
        setValue("jobTitle", profile.jobTitle);
        setValue("joiningDate", joiningDate);
        setValue("permanentAddress", profile.permanentAddress);
        setValue("department", profile.department);
        setValue("employeeStatus", profile.employeeStatus);
        setValue("workLocation", profile.workLocation);
      },
      (err: any) => {
        console.log("error is; ", err);
        toast.error(err.message);
      }
    );
  }, []);

  const formatDateForInput = (dateString: Date | string) => {
    const addDays = (date: Date, days: number) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const date = new Date(dateString);
    const adjustedDate = addDays(date, 1); // Adjust date to counteract timezone shift
    return adjustedDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen h-auto flex justify-center items-center md:py-12 py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-screen-sm space-y-3 px-3 text-black dark:text-white"
      >
        <h1 className="sm:text-3xl text-xl text-center  custom-font">
          Profile
        </h1>
        <div className="w-[70px] relative group cursor-pointer rounded-full overflow-hidden mb-3 ">
          <img src={user?.avatar.url} alt="User Avatar" className="w-full" />
          <div className="w-full h-full absolute top-0 left-0 -z-10 bg-[#00000073] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:z-10 duration-150 ease-in-out">
            {/* Hidden file input */}
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={onAvatarChange}
              accept="image/*"
            />
            <IconCamera size={30} className="text-[#ffffffcb]" />
          </div>
        </div>
        <div className="w-full space-y-3">
          <div className="w-full flex sm:flex-row flex-col gap-2">
            <div className="w-full">
              <label htmlFor="firstName" className="block  mb-1">
                First Name
              </label>
              <Input
                placeholder="Enter your first name..."
                {...register("firstName")}
              />
              <div className="text-red-500">{errors.firstName?.message}</div>
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="block  mb-1">
                Last Name
              </label>
              <Input
                placeholder="Enter your last name..."
                {...register("lastName")}
              />
              <div className="text-red-500">{errors.lastName?.message}</div>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="contactNumber" className="block  mb-1">
              Phone Number
            </label>
            <Input
              type="number"
              placeholder="Enter your phone number..."
              {...register("contactNumber")}
            />
            <div className="text-red-500">{errors.contactNumber?.message}</div>
          </div>
          <div className="w-full">
            <label htmlFor="Email" className="block  mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email..."
              {...register("email")}
            />
            <div className="text-red-500">{errors.email?.message}</div>
          </div>
          <div className="w-full">
            <label htmlFor="dateOfBirth" className="block  mb-1">
              Date Of Birth
            </label>
            <Input
              type="date"
              placeholder="Enter your date of birth..."
              {...register("dateOfBirth")}
            />
            <div className="text-red-500">{errors.dateOfBirth?.message}</div>
          </div>
          <div className="w-full">
            <label htmlFor="gender" className="block  mb-1">
              Gender
            </label>
            <select
              {...register("gender")}
              className="w-full bg-transparent hover:dark:border-[#fff]  border-2 border-neutral-700 rounded-md dark:text-white text-gray-700 px-6 py-3 text-base  cursor-pointer transition"
              required={true}
            >
              <option
                className="dark:bg-black bg-white dark:text-white text-black"
                value="Male"
              >
                Male
              </option>
              <option
                className="dark:bg-black bg-white dark:text-white text-black"
                value="Female"
              >
                Female
              </option>
              <option
                className="dark:bg-black bg-white dark:text-white text-black"
                value="Other"
              >
                Other
              </option>
            </select>
            <div className="text-red-500">{errors.gender?.message}</div>
          </div>
          <div className="w-full">
            <label htmlFor="permanentAddress" className="block  mb-1">
              Permanent Address
            </label>
            <Input
              placeholder="Enter your permanent address..."
              {...register("permanentAddress")}
            />
            <div className="text-red-500">
              {errors.permanentAddress?.message}
            </div>
          </div>
          <div className="w-full flex sm:flex-row flex-col gap-2">
            <div className="w-full">
              <label htmlFor="city" className="block  mb-1">
                City
              </label>
              <Input placeholder="Enter your city..." {...register("city")} />
              <div className="text-red-500">{errors.city?.message}</div>
            </div>
            <div className="w-full">
              <label htmlFor="state" className="block  mb-1">
                State
              </label>
              <Input
                placeholder="Enter your state/province..."
                {...register("stateProvince")}
              />
              <div className="text-red-500">
                {errors.stateProvince?.message}
              </div>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="permanentAddress" className="block  mb-1">
              Job Title
            </label>
            <Input
              placeholder="Enter your job title..."
              {...register("jobTitle")}
            />
            <div className="text-red-500">{errors.jobTitle?.message}</div>
          </div>
          <div className="w-full flex sm:flex-row flex-col gap-2">
            <div className="w-full">
              <label htmlFor="department" className="block  mb-1">
                Department
              </label>
              <select
                {...register("department")}
                className="w-full bg-transparent hover:dark:border-[#fff]  border-2 border-neutral-700 rounded-md dark:text-white text-gray-700 px-6 py-3 text-base  cursor-pointer transition"
                required={true}
              >
                {DepartmentsEnum.map((department) => (
                  <option
                    className="dark:bg-black bg-white dark:text-white text-black"
                    value={department}
                    key={department}
                  >
                    {department.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <div className="text-red-500">{errors.department?.message}</div>
            </div>
            <div className="w-full">
              <label htmlFor="employeeStatus" className="block  mb-1">
                Employee Status
              </label>
              <select
                {...register("employeeStatus")}
                className="w-full bg-transparent hover:dark:border-[#fff]  border-2 border-neutral-700 rounded-md dark:text-white text-gray-700 px-6 py-3 text-base  cursor-pointer transition"
                required={true}
              >
                <option
                  className="dark:bg-black bg-white dark:text-white text-black"
                  value="FULL_TIME"
                >
                  Full Time
                </option>
                <option
                  className="dark:bg-black bg-white dark:text-white text-black"
                  value="PART_TIME"
                >
                  Part Time
                </option>
                <option
                  className="dark:bg-black bg-white dark:text-white text-black"
                  value="INTERN"
                >
                  Intern
                </option>
              </select>
              <div className="text-red-500">
                {errors.employeeStatus?.message}
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="workLocation" className="block   mb-1">
                Work Location
              </label>
              <select
                {...register("workLocation")}
                className="w-full bg-transparent hover:dark:border-[#fff]  border-2 border-neutral-700 rounded-md dark:text-white text-gray-700 px-6 py-3 text-base  cursor-pointer transition"
                required={true}
              >
                <option
                  value="WFO"
                  className="dark:bg-black bg-white dark:text-white text-black"
                >
                  WFO
                </option>
                <option
                  value="WFH"
                  className="dark:bg-black bg-white dark:text-white text-black"
                >
                  WFH
                </option>
                <option
                  value="HYBRID"
                  className="dark:bg-black bg-white dark:text-white text-black"
                >
                  Hybrid
                </option>
              </select>
              <div className="text-red-500">{errors.workLocation?.message}</div>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="joiningDate" className="block  mb-1">
              Joining Date
            </label>
            <Input
              type="date"
              placeholder="Enter your joining date..."
              {...register("joiningDate")}
            />
            <div className="text-red-500">{errors.joiningDate?.message}</div>
          </div>
          <Button type="submit" disabled={submitLoading}>
            {submitLoading ? (
              <TailSpin height={24} width={24} color="#fff" />
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      </form>
      {showEditor && image && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-neutral-800 border-neutral-500 border-2 px-4 py-6 rounded-md">
            <AvatarEditor
              ref={(ref) => setEditor(ref)}
              image={image}
              width={200}
              height={200}
              border={50}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={1.2}
            />
            <div className="flex justify-between mt-4 gap-2 md:flex-row flex-col">
              <Button onClick={() => setShowEditor(false)} severity="secondary">
                Cancel
              </Button>
              <Button onClick={handleSaveAvatar} disabled={avatarLoading}>
                {avatarLoading ? (
                  <TailSpin
                    visible={true}
                    height="27"
                    width="27"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Save Avatar"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
