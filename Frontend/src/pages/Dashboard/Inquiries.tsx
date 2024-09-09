// Inquiries.js
import { useEffect, useState } from "react";
import { InquiryBox, Loader } from "../../components"; // Adjust the import path as needed
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { requestHandler } from "../../util";
import { getAllInquiriesRequest } from "../../api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { InquiryInterface } from "../../interfaces";
import { formatMongoDate } from "../../util";

const Inquiries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState("old");
  const [inquiries, setInquiries] = useState<InquiryInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    requestHandler(
      async () => await getAllInquiriesRequest(),
      setIsLoading,
      ({ data }) => setInquiries(data),
      (e) => {
        toast.error(e);
        navigate(-1);
      }
    );
  }, []);

  const onSortHandler = () => {
    setSortType((prev) => {
      const newSortType = prev === "latest" ? "old" : "latest";
      // Sort inquiries based on the new sort type
      const sortedInquiries = [...inquiries].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (newSortType === "latest") {
          return dateB - dateA; // Descending order
        } else {
          return dateA - dateB; // Ascending order
        }
      });

      setInquiries(sortedInquiries);
      return newSortType;
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="w-full sm:px-12 px-3 sm:py-14 py-12 custom-hero-bg text-white">
        <h1 className="custom-font text-xl font-light">Inquiries</h1>
        <p className="poppins text-2xl font-semibold">
          Unlock Insights with Every Inquiry.
        </p>
      </div>
      {inquiries.length > 0 ? (
        <div className="container mx-auto md:px-4 px-2">
          <div className="w-full my-5">
            <button
              onClick={onSortHandler}
              className="px-6 py-2 rounded-md border-[1px] dark:border-white border-black/70 text-sm flex gap-1 items-center justify-center"
            >
              {sortType == "latest" ? <FaArrowUpLong /> : <FaArrowDownLong />}
              SORT
            </button>
          </div>
          <div className="grid gap-4 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
            {inquiries.map((inquiry, index) => (
              <InquiryBox
                key={index}
                subject={inquiry.subject}
                email={inquiry.email}
                name={inquiry.name}
                message={inquiry.message}
                createdDate={formatMongoDate(inquiry.createdAt)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-64 flex items-center justify-center">
          <p className="text-lg  text-center font-semibold">
            No Inquiries found.
          </p>
        </div>
      )}
    </>
  );
};

export default Inquiries;
