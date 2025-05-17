import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Bot,
  Scale,
} from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="border-t bg-white dark:border-black dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-700 ">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4 dark:text-blue-200">
            <div className="flex items-center space-x-2">
              <Scale size={28} />
              <h3 className="text-xl font-bold">LAW-WISE</h3>
            </div>
            <p className="textDark text-sm opacity-75">
              Empowering businesses with innovative legal solutions. Automating
              your legal tasks with ease and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold dark:text-blue-200">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { text: "About Us", href: "/about" },
                { text: "Services", href: "/services" },
                { text: "Contact", href: "/contact" },
                { text: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="textDark text-sm transition-colors hover:text-primary"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold dark:text-blue-200">Legal</h4>
            <ul className="space-y-2">
              {[
                { text: "Terms of Service", href: "/terms" },
                { text: "Privacy Policy", href: "/privacy" },
                { text: "Cookie Policy", href: "/cookie-policy" },
                { text: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="textDark text-sm transition-colors hover:text-primary"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold dark:text-blue-200">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="textDark hover:text-primary-foreground rounded-full bg-muted p-2 transition-colors hover:bg-primary"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <p className="textDark text-sm">Email: contact@law-wise.com</p>
              <p className="textDark text-sm">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
