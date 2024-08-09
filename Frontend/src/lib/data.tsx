export interface Project {
  title: string;
  description: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "Web Development Solutions",
    description:
      "Expert solutions for building scalable and dynamic websites that drive business growth and enhance user engagement.",
    link: "/web-development",
  },
  {
    title: "App Development Services",
    description:
      "Custom app development services to create robust and innovative applications for mobile and web platforms.",
    link: "/app-development",
  },
  {
    title: "E-commerce Solutions",
    description:
      "Tailored e-commerce platforms to boost online sales with seamless shopping experiences and advanced features.",
    link: "/ecommerce",
  },
  {
    title: "Project Management Tools",
    description:
      "Integrated project management tools to streamline workflows, enhance team collaboration, and ensure timely project delivery.",
    link: "/project-management",
  },
  {
    title: "IT Consultancy Services",
    description:
      "Professional IT consultancy to guide your technology strategy and optimize systems for better performance and efficiency.",
    link: "/consultancy",
  },
  {
    title: "Custom Software Development",
    description:
      "Bespoke software solutions tailored to your unique business needs, ensuring optimal performance and scalability.",
    link: "/custom-software",
  },
];
