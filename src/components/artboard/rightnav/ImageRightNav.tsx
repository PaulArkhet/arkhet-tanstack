import protoIcon from "/iconproto.svg";
import plusIcon from "/iconplus.png";

export default function ImageRightNav() {
    return (
        <div>
            <div className="px-5 py-5 border-b border-b-[#303030]">
                <div>Image</div>
                <img src={protoIcon} alt="" />
            </div>
            <div className="px-5 py-3 border-b border-b-[#303030]">
                <div className="flex justify-between">
                    <div>Upload new img</div>
                    <img src={plusIcon} alt="" className="py-2" />
                </div>
            </div>
        </div>
    );
}
