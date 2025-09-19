export const navBarStyles = {
    mainContainer: "w-full z-50 fixed flex bg-[#EFF1F3] border-b-5 shadow border-b-white h-14 sm:h-16 md:h-17 lg:h-18",

    // classes for first section in the nevbar. Logo and Location search bar
    firstContainer: "my-auto mt-2 ml-2 flex justify-between relative lg:w-[25vw] md:w-[25vw] sm:w-[25vw] w-[17%] ",
    icon: "lg:w-13 md:w-12 sm:w-11 w-10 h-8 mt-2",
    locationSearchContainer: 'relative flex justify-between pt-2 pl-2 pb-1 mr-4 h-9 sm:h-10 md:h-11 lg:h-12 border-2 rounded-sm lg:w-[77%] md:w-[77%] sm:w-[77%] w-[40%]',
    locationSearchIcon: "w-5 h-5 m-1",
    locatoinSearchInput: "mb-2 text-md focus:outline-none",

    // classes for location drop down
    locationNameContainer: "cursor-pointer flex h-12 pt-3 pl-6 hover:bg-blue-200 w-full",

    // classes for second section in the navbar. Main search bar.
    secontContainer: "flex justify-between relative sm:w-[43vw] w-[8vw]",
    secontContainerLoggedIn: "flex justify-between relative sm:w-[50vw] w-[8vw]",
    mainSearchInput: 'pl-2 pb-1 font-semibold mt-2 sm:block hidden sm:w-[43vw] w-[8vw] h-9 sm:h-10 md:h-11 lg:h-12 border-2 rounded-l-sm ',
    mainSearchInputLogged: 'pl-2 pb-1 font-semibold mt-2 sm:block hidden sm:w-[50vw] w-[8vw] h-9 sm:h-10 md:h-11 lg:h-12 border-2 rounded-l-sm ',
    searchButton: "bg-black ml-auto font-semibold mt-2 w-12 h-9 sm:h-10 md:h-11 lg:h-12 rounded-r-sm",
    searchIcon: "p-3",

    // classes for thrid section
    thirdContainer: "flex justify-between w-[32vw] items-center px-3",
    thirdContainerLoggedIn: "flex justify-between w-[25vw] items-center px-3",
    language: 'flex justify-between gap-1 mb-3 cursor-pointer',
    chatIcon: "w-5 h-5 cursor-pointer",
    bellIcon: "w-5 h-5 cursor-pointer",
    profileIcon: "w-7 h-7 cursor-pointer",
    profileIconAngle: "w-5 h-5 cursor-pointer rotate-225",
    favIcon: "w-5 h-5 cursor-pointer",
    angleIcon: "rotate-225 w-5 h-5 cursor-pointer",
    sellButton: "h-13 mr-2 cursor-pointer",
    logInText: 'font-bold underline underline-offset-5 hover:no-underline cursor-pointer',



}