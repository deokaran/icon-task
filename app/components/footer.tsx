import Image from "next/image"
export default function Footer() {

    return <>
        <footer className="bg-[#b7202e] text-white/70">
            <div className="mx-25   grid gap-10 md:grid-cols-3 mt-5">

               
                 <div className="col-span-1">
                    <img src="/KJSIMlogo.png" alt="" className="max-w-[300px] brightness-0" />
                    <h3 className="font-bold ">
                        Host Department
                    </h3>
                    <p>
                        Department of Data Science and Technology
                        K J Somaiya Institute of Management
                        Somaiya Vidyavihar University
                    </p>
                </div>
                <div className="col-span-1">
                   
                    <h3 className="font-bold ">
                     Quick Links
                    </h3>
                    <ul >
                        <li><a href="">Home</a></li>
                        <li><a href="">Events</a></li>
                        <li><a href="">CodeIcon</a></li>
                        <li><a href="">Register</a></li>
                    </ul>
                </div>

                <div className="col-span-1">
                    <h3 className="font-bold ">
                        Contact Us
                    </h3>
                    <p>
                        Ajil George <a href="tel:+918828279724">
                            +91-8828279724
                        </a>
                    </p>
                    <p>
                        Abin Cheruvathoor <a href="tel:+918355868197">
                            +91-8355868197
                        </a>
                    </p>
                    <p>
                        Email: <a href="mailto:icon.simsr@somaiya.edu">
                             icon.simsr@somaiya.edu
                        </a>
                    </p>
                </div>
               
            </div>
            <div className="mx-25 lower-footer  my-5 pt-5 border-t">
                    <p className="text-xs text-center">
                        © Copyright ICON. All Rights Reserved
                    </p>
            </div>
        </footer>
    </>
}