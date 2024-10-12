import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { Github, Instagram, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="mx-auto w-full max-w-none px-5 text-sm sm:max-w-[90%] sm:px-0 2xl:max-w-7xl">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch justify-between gap-y-10 sm:gap-x-6 md:flex md:flex-wrap">
          <div className="col-span-full flex items-center justify-between md:flex-col md:justify-normal">
            <Link to="/" className="flex items-start">
              <Logo />
            </Link>

            <div className="flex justify-center gap-4 text-muted-foreground md:mt-4">
              <a
                aria-label="Project Owner Github"
                href="https://github.com/ahirkhushal"
                target="_blank"
                rel="noopener noreferrer"
                className="duration-200 hover:text-foreground"
              >
                <Github className="size-4" />
              </a>
              <a
                aria-label="X/Twitter Handle"
                href="https://x.com/Khushal_Ahir_"
                target="_blank"
                rel="noopener noreferrer"
                className="duration-200 hover:text-foreground"
              >
                <X className="size-4" />
              </a>
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/khushalllllll_//"
                target="_blank"
                rel="noopener noreferrer"
                className="duration-200 hover:text-foreground"
              >
                <Instagram className="size-[18px]" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-sm font-semibold lg:text-sm">Customer Service</p>
            <ul className="w-fit space-y-1">
              <li className="w-full text-xs text-muted-foreground hover:text-secondary-foreground">
                Shipping & Returns
              </li>
              <li className="w-full text-xs text-muted-foreground hover:text-secondary-foreground">
                FAQs
              </li>
              <li className="w-full text-xs text-muted-foreground hover:text-secondary-foreground">
                Contact Us
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-sm font-semibold lg:text-sm">Company Info</p>
            <ul className="w-fit space-y-1">
              <li className="w-full text-xs text-muted-foreground hover:text-secondary-foreground">
                About Us
              </li>
              <li className="w-full text-xs text-muted-foreground hover:text-secondary-foreground">
                Careers
              </li>
              <li className="w-full text-xs text-muted-foreground hover:text-secondary-foreground">
                Privacy Policy
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-sm font-semibold lg:text-sm">Address</p>

            <ul className="w-fit space-y-1">
              <li className="w-full text-xs text-muted-foreground hover:text-secondary-foreground">
                Surat, Gujarat, India
              </li>
              <li className="w-full text-xs text-muted-foreground hover:text-secondary-foreground">
                Phone: +91-9979503660
              </li>
              <li className="w-full text-xs text-muted-foreground hover:text-secondary-foreground">
                khushalbusiness@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-7xl flex-col items-center justify-center gap-4 border-t px-4 py-6 lg:flex-row">
        <p className="max-w-4xl text-center text-xs text-muted-foreground lg:text-sm">
          <a href="#" className="inline-flex items-center justify-center">
            <span className="font-heading text-base tracking-wide text-primary underline drop-shadow-md">
              TheWears
            </span>
          </a>{" "}
          is an independent fashion brand. All trademarks and copyrights belong
          to their respective owners. Images and content are for display
          purposes only.
        </p>
      </div>
    </footer>
  );
}
