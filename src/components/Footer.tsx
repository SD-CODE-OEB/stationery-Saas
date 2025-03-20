import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Mail, Instagram, Twitter, Facebook, Youtube, MapPin, PhoneCall } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <span className="font-bold text-lg">Stationery Shop</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Quality stationery products for work, school, and creative projects.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Facebook size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Instagram size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitter size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Youtube size={16} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <div className="space-y-2 pt-2 xl:mt-12">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 xl:w-8 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">Beside Airport Bawarchi, near Shamshabad Bus depot, Shamshabad, 501218.</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <PhoneCall className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">(91) 8096-8096-77</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@azeembookcenter.com</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Stationery Shop. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* Visa */}
            <svg className="h-6" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
              <rect width="780" height="500" fill="white" />
              <path d="M293.2 348.7L248.9 166.8C246.6 157.9 240.2 152.3 232.4 152.3H168.8L167.4 158.8C185.4 163.1 216.6 172.2 229.1 179.5C235.2 183.2 236.7 186.1 239 192.8L293.2 348.7Z" fill="#F7A823" />
              <path d="M334 152.4H279.8C272.7 152.4 267.3 156.6 264.8 163.7L204.8 348.7H261.7L270 323.1H325.8L331.4 348.7H382.5L334 152.4ZM283.1 283.1L304.1 214.4L317 283.1H283.1Z" fill="#00579F" />
              <path d="M460.8 209.1C460.8 198.7 469.5 191.6 484 191.6C495.8 191.6 508.8 197.3 517.8 203.3L525.6 160.5C513.5 155.1 496.4 152.2 480.3 152.2C425.5 152.2 390.8 178.3 390.5 216.5C390.2 244.8 414.4 260.5 432.4 270.2C451 280.1 458.2 286.5 458.1 295.5C457.9 309.2 441.6 315.1 426.1 315.1C407.2 315.1 387.3 308.3 374.3 298.1L366.4 342.2C380.9 350.9 410.5 358.3 441 358.5C499.7 358.5 532.5 332.9 532.7 291.7C533 248.1 460.8 246.1 460.8 209.1Z" fill="#00579F" />
              <path d="M661.8 152.4H618.9C610.8 152.4 604.5 156.6 601.7 163.7L517.8 348.7H574.8C574.8 348.7 584.2 323.5 586.4 317.7C593 317.7 634.7 317.8 643.1 317.8C644.9 325.1 650.1 348.7 650.1 348.7H701.5L661.8 152.4ZM599.5 276.6C603.7 264.9 620.4 219.6 620.4 219.6C620 219.9 625.1 205.9 627.7 196.8L632.3 216.9C632.3 216.9 642.6 265.9 644.6 276.6H599.5Z" fill="#00579F" />
            </svg>

            {/* Mastercard */}
            <svg className="h-6" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
              <rect width="780" height="500" fill="white" />
              <path d="M449.01 250.49C449.01 323.98 389.48 383.51 315.99 383.51C242.5 383.51 182.97 323.98 182.97 250.49C182.97 177.01 242.5 117.47 315.99 117.47C389.48 117.47 449.01 177.01 449.01 250.49Z" fill="#EB001B" />
              <path d="M597.63 250.49C597.63 323.98 538.1 383.51 464.61 383.51C391.12 383.51 331.59 323.98 331.59 250.49C331.59 177.01 391.12 117.47 464.61 117.47C538.1 117.47 597.63 177.01 597.63 250.49Z" fill="#F79E1B" />
              <path d="M390.3 165.22C363.92 186.14 347.39 219.07 347.39 255.9C347.39 292.73 363.92 325.66 390.3 346.58C416.69 325.66 433.21 292.73 433.21 255.9C433.21 219.07 416.69 186.14 390.3 165.22Z" fill="#FF5F00" />
            </svg>

            {/* American Express */}
            <svg className="h-6" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="American Express">
              <rect width="780" height="500" fill="#006FCF" />
              <path d="M621 320.7V296.3H583.7L579.9 304.3L576 296.3H476.2V319.9L471.6 296.3H444.9L440.4 320.1V296.3H401.4L397.4 306H392.2L388.2 296.3H354.3V324.5L344.1 296.3H321.6L300.8 341.9H323.7L327.6 332.3H344.4L348.3 341.9H394.1V331.4L398.3 341.9H423.3L427.5 331.1V341.9H583.7L587.6 333.7L591.7 341.9H621V320.7ZM331.1 322.9L339.6 303.6L348.2 322.9H331.1ZM455.8 319.9H443.5L443.3 299.5L429 319.9H418.3L404 299.4V319.9H383.3L379.3 310.3H360.7L356.8 319.9H344.5L362.3 281.3H379.1L396 319.9H455.8ZM504.4 319.9H461.9V281.3H504.4V292.2H474.7V295.8H503.8V306.1H474.7V309.6H504.4V319.9ZM541.3 319.9H527.4L509.1 281.3H523.1L534.3 308.3L545.2 281.3H559.1L541.3 319.9ZM583.7 319.9H550.1V281.3H583.7L593.3 300.9L602.5 281.3H620.3L605 300.6L620.2 319.9H601.9L593.4 301.3L583.7 319.9Z" fill="white" />
              <path d="M323.7 341.9L300.8 341.9L321.6 296.3L344.1 296.3L354.3 324.5L354.3 296.3L388.2 296.3L392.2 306L397.4 296.3L401.4 296.3L401.4 320.1L440.4 296.3L444.9 296.3L471.6 296.3L476.2 319.9L476.2 296.3L576 296.3L579.9 304.3L583.7 296.3L621 296.3L621 320.7L621 341.9L591.7 341.9L587.6 333.7L583.7 341.9L427.5 341.9L427.5 331.1L423.3 341.9L398.3 341.9L394.1 331.4L394.1 341.9L348.3 341.9L344.4 332.3L327.6 332.3L323.7 341.9ZM462 158.1L479.1 158.1L479.1 196.8L500.5 196.8L500.5 212.9L462 212.9L462 158.1ZM380.6 158.1L404.8 158.1L417.3 185.1L429.1 158.1L453 158.1L453 212.9L435.6 212.9L435.6 174.9L421.1 212.9L412.5 212.9L397.8 174.9L397.8 212.9L380.6 212.9L380.6 158.1ZM338.3 158.1L374.8 158.1L374.8 173.9L355.4 173.9L355.4 177.4L374.3 177.4L374.3 191.8L355.4 191.8L355.4 195.5L374.8 195.5L374.8 212.9L338.3 212.9L338.3 158.1ZM258.7 158.1L277.1 158.1L300.5 189.2L300.5 158.1L331.4 158.1L343 174.4L353.9 158.1L375.7 158.1L351.8 188.4L376.9 212.9L354.4 212.9L342.8 197.4L331.8 212.9L300.5 212.9L300.5 181.5L277.1 212.9L258.7 212.9L282.3 180.4L258.7 158.1ZM501.6 158.1L541.9 158.1L553.4 172.6L565.4 158.1L605.2 158.1L578.1 186.1L605.5 212.9L565.1 212.9L553.1 197L540.5 212.9L501.6 212.9L529.1 185.7L501.6 158.1Z" fill="white" />
            </svg>

            {/* PayPal */}
            <svg className="h-6" viewBox="0 0 780 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PayPal">
              <rect width="780" height="500" fill="white" />
              <path d="M535.3 235.3C535.3 282.7 497.4 320.6 450 320.6C402.6 320.6 364.7 282.7 364.7 235.3C364.7 187.9 402.6 150 450 150C497.4 150 535.3 187.9 535.3 235.3Z" fill="#003087" />
              <path d="M506.9 232C506.9 251.9 491 268 471.4 268H450.8C450.4 268 450.1 268.3 450.1 268.7V288.1C450.1 288.6 449.7 289 449.2 289H435.1C434.6 289 434.3 288.5 434.3 288.1V190.8C434.3 190.3 434.7 189.9 435.1 189.9H471.3C491 189.9 506.9 205.9 506.9 225.9C506.9 226 506.9 226 506.9 226.1V232ZM470.4 204H450.9C450.5 204 450.1 204.3 450.1 204.8V252.2C450.1 252.7 450.5 253 450.9 253H470.4C482.2 253 491.8 243.1 491.8 231C491.8 218.9 482.3 204 470.4 204Z" fill="white" />
              <path d="M346.2 232C346.2 251.9 330.3 268 310.7 268H290.1C289.7 268 289.4 268.3 289.4 268.7V288.1C289.4 288.6 289 289 288.5 289H274.4C273.9 289 273.6 288.5 273.6 288.1V190.8C273.6 190.3 274 189.9 274.4 189.9H310.6C330.3 189.9 346.2 205.9 346.2 225.9C346.2 226 346.2 226 346.2 226.1V232ZM309.7 204H290.2C289.8 204 289.4 204.3 289.4 204.8V252.2C289.4 252.7 289.8 253 290.2 253H309.7C321.5 253 331.1 243.1 331.1 231C331.1 218.9 321.6 204 309.7 204Z" fill="#0070E0" />
              <path d="M376.7 269H362.7C362.2 269 361.8 268.6 361.9 268.1L383.6 190.8C383.7 190.3 384.1 190 384.6 190H402.9C403.4 190 403.8 190.4 403.7 190.9L381.4 268.2C381.3 268.7 380.9 269 380.4 269H376.7Z" fill="#0070E0" />
              <path d="M537.5 269H523.4C522.9 269 522.6 268.6 522.6 268.1L544.3 190.8C544.4 190.3 544.8 190 545.3 190H563.6C564.1 190 564.5 190.4 564.4 190.9L542.1 268.2C542 268.7 541.6 269 541.1 269H537.5Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
