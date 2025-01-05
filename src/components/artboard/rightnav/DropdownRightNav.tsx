import triangle from "/icontriangletop.svg";
import ellipsis from "/iconellipsis.svg";
import toggleOffBright from "/icontoggleoffbright.svg";
import triangleRight from "/icontriangleright.svg";
import toggleOff from "/icontoggleoff.svg";
import plusgrey from "/iconplusgrey.svg";

export default function DropdownRightNav() {
    return (
        <div>
            <div className="px-5 py-5 border-b border-b-[#303030]">
                <div className="flex justify-between pb-2">
                    <p className="">Dropdown</p>
                    <img src={ellipsis} alt="" />
                </div>
                <div className="flex py-2 hover:cursor-pointer">
                    <div className="bg-zinc-600 mt-2 mr-2 h-[5px] w-[18px]"></div>
                    <p>Multi Select Dropdown</p>
                </div>
            </div>
            <div className="px-5 py-5 border-b border-b-[#303030]">
                <div className="py-2 flex">
                    <img src={triangle} className="pr-2" />
                    <div>No Icons</div>
                </div>
                <div className="py-2 flex">
                    <img src={toggleOffBright} className="pr-2" />
                    <div>Label</div>
                </div>
                <div className="py-2 flex">
                    <img src={toggleOffBright} className="pr-2" />
                    <div>Helper Text</div>
                </div>
                <div className="py-2 flex">
                    <img src={toggleOffBright} className="pr-2" />
                    <div>Description</div>
                </div>
                <div className="py-2 flex text-[#666666]">
                    <img src={toggleOff} className="pr-2" />
                    <div>Error</div>
                </div>
                <div className="py-2 flex text-[#666666]">
                    <img src={toggleOff} className="pr-2" />
                    <div>Disabled State</div>
                </div>
            </div>
            <div className="px-5 py-5">
                <p className="pb-2">Options</p>
                <div className="flex flex-col">
                    <div className="flex py-2">
                        <img src={triangleRight} />
                        <label className="px-2">Item 1</label>
                    </div>
                    <div className="flex py-2">
                        <img src={triangleRight} />
                        <label className="px-2">Item 2</label>
                    </div>
                    <div className="flex py-2">
                        <img src={triangleRight} />
                        <label className="px-2">Item 3</label>
                    </div>
                </div>
                <div className="flex py-2 hover:cursor-pointer">
                    <img src={plusgrey} />
                    <p className="px-2 text-[#464646]">Add Option</p>
                </div>
            </div>
        </div>
    );
}
