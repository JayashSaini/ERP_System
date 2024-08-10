import aboutus from "../assets/aboutus.svg";

const About: React.FC = () => {
  return (
    <section
      className="flex md:flex-row flex-col-reverse gap-14 md:my-28 my-10 "
      id="aboutUs"
    >
      <div className="md:w-1/2 w-full flex items-end justify-center">
        <img src={aboutus} alt="" className="md:w-[70%] w-full" />
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-4xl text-3xl custom-font font-semibold custom-color">
          About Us
        </h1>
        <p className="text-base md:w-4/5 w-full">
          Welcome to GPC IT Solutions, where we provide innovative technology
          solutions tailored to meet the unique needs of your business. Our team
          of experts is dedicated to delivering cutting-edge IT services, from
          seamless system integration to advanced cloud solutions and robust
          cybersecurity measures. We leverage our extensive experience and the
          latest technologies to drive your business forward with efficiency and
          security.
        </p>
      </div>
    </section>
  );
};

export default About;
