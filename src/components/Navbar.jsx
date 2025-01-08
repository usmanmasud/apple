import React from "react";
import { appleImg, bagImg, blackImg, searchImg } from "../utils";
import { navLists } from '../constants'

export const Navbar = () => {
    return (
        <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
            <nav className="flex w-full screen-max-width">
                <img src={appleImg} alt="apple" width={14} height={18} />

                <div className="flex flex-1 justify-center max-sm:hidden">
                    {navLists.map((nav, index) => (
                        <div key={`${index}-${nav}`}>{nav}</div>
                    ))}
                </div>
                <div>
                    <img src={searchImg} alt="search-img" width={18} height={18} />
                    <img src={bagImg} alt="back" width={18} height={18} />
                </div>
            </nav>
        </header>
    );
};
