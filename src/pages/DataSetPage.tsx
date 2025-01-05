/*
Author: Paul Kim, Vitor Akiyama, Selina Park
Date: September 16, 2024
Version: 0.0.1
Detail: Data Set Page for Arkhet
*/

import { Effect, Exit, Option, pipe } from "effect";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { removeFileExtension } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";
import SkeletonComponent from "@/components/design-system/components/Skeleton";
import axios from "axios";
import DOMAIN from "@/services/endpoint";
import useAuthStore from "@/store/AuthStore";
import uploadIcon from "/iconupload.svg";
import editIcon from "/iconedit.svg";
import backIcon from "/iconback.svg";
import trashIcon from "/icontrash.png";
import imageDelete from "/imagedelete.png";

type Dataset = {
    user_id: string;
    created_at: string;
    active: boolean;
    title: string;
    edited_at: string;
    content: string;
    dataset_id: string;
    headers: string;
};

function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, "g"), replace);
}

export default function DataSetPage() {
    const [isData, setIsData] = useState<boolean>(false);
    const [dataSets, setDataSets] = useState<Dataset[]>([]);
    //@ts-ignore
    const [dataNames, setDataNames] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    //@ts-ignore
    const { user } = useAuthStore((state) => state);
    const navigate = useNavigate();
    const [datasetIsActive, setDatasetIsActive] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    useEffect(() => {
        if (!user) navigate("/");
        async function getDataSets() {
            const datasets = await axios.get(
                `${DOMAIN}/api/v0/datasets/${user!.user_id}`
            );
            const newDataSets = datasets.data as Dataset[];

            const newTitles: string[] = newDataSets.map(
                (dataSet) => dataSet.title
            );

            setDataSets(newDataSets);
            setDataNames(newTitles);

            if (newDataSets.length > 0) setIsData(true);
        }
        getDataSets();
    }, []);

    const handleData = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]!;
        const fileName = removeFileExtension(file.name);
        //@ts-ignore
        const user_id = user!.user_id;
        const title = removeFileExtension(file.name);
        const text = await file.text();
        const lines = text.split("\n");
        const headers = lines[0].split(",").map((header) => header.trim());
        const content = lines.slice(1).join("\n");
        try {
            const res = await axios.post(`${DOMAIN}/api/v0/datasets`, {
                user_id,
                title,
                headers: JSON.stringify(headers),
                content: JSON.stringify(content),
            });
            if (res.data.success) {
                const newDataSet = res.data.content;

                setDataNames((oldDataNames) => {
                    const newDataNames = [...oldDataNames, fileName];
                    setSelectedIndex(newDataNames.length - 1);
                    return newDataNames;
                });

                setDataSets((oldDataSets) => [...oldDataSets, newDataSet]);
                setLoading(true);
                const timer = setTimeout(() => {
                    setLoading(false);
                    setIsData(true);
                }, 3000);
                e.target.value = "";
                return () => clearTimeout(timer);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = (index: number) => {
        setSelectedIndex(index);
        setDatasetIsActive(true);
    };

    function toggleShoWMenu() {
        setShowMenu(!showMenu);
    }

    async function handleDeleteDataset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${DOMAIN}/api/v0/datasets/delete/${dataSets[selectedIndex].dataset_id}`
            );
            setDataSets((prevDataSets) =>
                prevDataSets.map((dataset) =>
                    dataset.dataset_id === dataSets[selectedIndex].dataset_id
                        ? { ...dataset, active: false }
                        : dataset
                )
            );
            if (res.data.success) {
                setDeleteMode(false);
                setDatasetIsActive(false);
            }
        } catch (error) {
            console.error("Error deleting dataset:", error);
        }
    }

    return (
        <div className="w-full">
            {deleteMode && (
                <div className="fixed z-[201] py-5 px-2 md:px-5 rounded-lg bg-[#1A1A1A] top-[10%] md:left-[35%] flex flex-col">
                    <img src={imageDelete} alt="" />
                    <div className="text-xl py-5 font-bold">
                        Delete For Eternity
                    </div>
                    <div className="">
                        You are about to permanently delete{" "}
                        <span className="text-[#D2B1FD]">
                            {dataSets && dataSets[selectedIndex].title}
                        </span>
                        . This <br /> dataset will be gone forever.
                    </div>
                    <div className="mx-auto py-2">
                        <form onSubmit={handleDeleteDataset}>
                            <input
                                name="content"
                                id="content"
                                defaultValue="[this message was deleted]"
                                className="hidden"
                            />
                            <div className="flex pl-64">
                                <button
                                    className="hidden md:block md:pb-1 edit-btn cursor-pointer px-5 py-2 md:my-2 mx-2 bg-[#BABABA] rounded hover:bg-[#fafafa] transition-all ease duration-300 text-black tracking-widest"
                                    onClick={() => setDeleteMode(false)}
                                >
                                    CANCEL
                                </button>
                                <button className="hidden md:block delete-btn cursor-pointer px-5 py-2 md:my-2 bg-[#DD4B63] rounded hover:bg-red-600 transition-all ease duration-300 tracking-widest">
                                    DELETE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deleteMode && (
                <div
                    className="fixed inset-0 bg-black z-[200] opacity-70"
                    onClick={() => setDeleteMode(false)}
                ></div>
            )}
            <div
                className={`px-5 ${
                    datasetIsActive && "border-b border-b-zinc-700"
                }`}
            >
                {!datasetIsActive && (
                    <div className="pb-5">
                        <div className="flex justify-between pt-5 pr-5">
                            <h2 className="font text-xl">Dataset</h2>
                            <div className="flex rounded bg-[#424242] px-6 py-2 text-white cursor-pointer">
                                <img
                                    src={uploadIcon}
                                    className="cursor-pointer"
                                />
                                <label
                                    htmlFor="fileUpload"
                                    className="pl-3 text-sm tracking-widest cursor-pointer"
                                >
                                    UPLOAD CSV
                                </label>
                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept=".csv"
                                    onChange={handleData}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <h3>Upload your dataset to apply to your prototype</h3>
                    </div>
                )}
                {datasetIsActive && (
                    <div className="flex justify-between pt-5 pr-5">
                        <div>
                            <div
                                className="flex w-[200px] cursor-pointer"
                                onClick={() => setDatasetIsActive(false)}
                            >
                                <img
                                    src={backIcon}
                                    alt=""
                                    className="w-[15px]"
                                />
                                <div className="pl-2 text-sm">
                                    Back to Dataset
                                </div>
                            </div>
                            <h2 className="font text-2xl pl-7 py-2">
                                {dataSets && dataSets[selectedIndex].title}
                            </h2>
                        </div>
                        <div className="flex rounded bg-[#424242] text-white cursor-pointer px-7 pt-3 h-[40px]">
                            <img
                                src={editIcon}
                                className="cursor-pointer w-[15px] h-[15px]"
                            />
                            <div
                                className="pl-3 text-sm tracking-widest cursor-pointer"
                                onClick={toggleShoWMenu}
                            >
                                EDIT
                            </div>
                        </div>
                        {showMenu && (
                            <div className="fixed top-[120px] right-[40px] bg-zinc-700 py-5 px-5 rounded hover:cursor-pointer z-50 flex">
                                <img src={trashIcon} className="py-1" />
                                <div
                                    className="pl-2 text-[#D2B1FC] cursor-pointer"
                                    onClick={() => setDeleteMode(true)}
                                >
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {!datasetIsActive && (
                    <div className="flex justify-between py-3">
                        <div className="flex gap-2">
                            {dataSets && dataSets.length > 0
                                ? dataSets
                                      .filter((dataset) => dataset.active)
                                      .map((data, index: number) => (
                                          <div
                                              key={index}
                                              onClick={() => handleClick(index)}
                                              className="px-10 pl-5 py-5 border border-[#505050] rounded-2xl cursor-pointer"
                                          >
                                              <div className="flex">
                                                  <div>
                                                      <div className="flex">
                                                          <svg
                                                              width="16"
                                                              height="18"
                                                              viewBox="0 0 16 18"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              className="fill-current text-white"
                                                          >
                                                              <path d="M16 2.8125V4.5C16 6.05391 12.4179 7.3125 8 7.3125C3.58214 7.3125 0 6.05391 0 4.5V2.8125C0 1.25859 3.58214 0 8 0C12.4179 0 16 1.25859 16 2.8125ZM14.0429 7.54805C14.7857 7.28789 15.4679 6.95391 16 6.54258V10.125C16 11.6789 12.4179 12.9375 8 12.9375C3.58214 12.9375 0 11.6789 0 10.125V6.54258C0.532143 6.95742 1.21429 7.28789 1.95714 7.54805C3.56071 8.11055 5.69643 8.4375 8 8.4375C10.3036 8.4375 12.4393 8.11055 14.0429 7.54805ZM0 12.1676C0.532143 12.5824 1.21429 12.9129 1.95714 13.173C3.56071 13.7355 5.69643 14.0625 8 14.0625C10.3036 14.0625 12.4393 13.7355 14.0429 13.173C14.7857 12.9129 15.4679 12.5789 16 12.1676V15.1875C16 16.7414 12.4179 18 8 18C3.58214 18 0 16.7414 0 15.1875V12.1676Z" />
                                                          </svg>
                                                          <div className="pl-2">
                                                              {data.title}
                                                          </div>
                                                      </div>
                                                      <div className="text-[#666666]">
                                                          {data.title}.csv
                                                      </div>
                                                  </div>
                                                  <div className="pl-20 pt-3 text-[#D2B1FD]">
                                                      View Dataset
                                                  </div>
                                              </div>
                                          </div>
                                      ))
                                : null}
                        </div>
                    </div>
                )}
            </div>
            {datasetIsActive && (
                <div className="px-5 py-4">
                    {loading ? (
                        <SkeletonComponent type="table" />
                    ) : (
                        (() => {
                            console.log(dataSets, selectedIndex);
                            return (
                                isData && (
                                    <DataTable
                                        dataset={dataSets[selectedIndex]}
                                    />
                                )
                            );
                        })()
                    )}
                </div>
            )}
        </div>
    );
}

/*
class JsonParseError {
    readonly _tag = "JsonParseError";
}
*/

function DataTable(props: { dataset: Dataset | undefined }) {
    const [body, setBody] = useState<JSX.Element | JSX.Element[] | null>(null);
    const [headers, setHeaders] = useState<JSX.Element | JSX.Element[] | null>(
        null
    );

    function parseHeaders(dataset: Dataset | undefined) {
        return pipe(
            dataset,
            Option.fromNullable,
            Effect.flatMap((dataset) =>
                pipe(
                    Effect.try(() => JSON.parse(dataset.headers) as string[]),
                    // Effect.mapError(() => new JsonParseError()),
                    Effect.map((headers) =>
                        headers.map((header) => <TableHead>{header}</TableHead>)
                    )
                )
            )
        );
    }

    function removeCommasFromBlocksWithQuotes(line: string) {
        return line;
    }

    useEffect(() => {
        console.log("eff ran", props.dataset);
        pipe(
            parseBody(props.dataset),
            Option.getOrElse(() => <></>),
            setBody
        );
        pipe(
            parseHeaders(props.dataset),
            Effect.runSyncExit,
            Exit.getOrElse(() => {
                return <div>Failed to parse headers</div>;
            }),
            setHeaders
        );
    }, [props.dataset]);

    function parseBody(dataset: Dataset | undefined) {
        return pipe(
            dataset,
            Option.fromNullable,
            (p) => p,
            Option.map((dataset) =>
                // "1,2,3\r\n4,5,6\r\n7,8,9\r\n" dataset.content
                // " "test{comma} test{comma} test" ,2,3 \r\n4,5,6\r\n7,8,9\r\n" dataset.content

                pipe(
                    dataset.content,

                    (content) => content.slice(1, content.length - 1),

                    (content) => content.split("\\r\\n"),
                    (content) =>
                        content.map((line, index) => (
                            <TableRow
                                key={index}
                                className="border border-[#303030]"
                            >
                                {pipe(
                                    line,
                                    removeCommasFromBlocksWithQuotes,
                                    (line) => line.split(","),
                                    (listOfColumn) =>
                                        listOfColumn.map((column) =>
                                            pipe(
                                                column,
                                                (column) =>
                                                    replaceAll(
                                                        column,
                                                        "{comma}",
                                                        ","
                                                    ),
                                                (column) => (
                                                    <TableCell className="text-left">
                                                        {column}
                                                    </TableCell>
                                                )
                                            )
                                        )
                                )}
                            </TableRow>
                        ))
                )
            )
        );
    }

    return (
        <Table className="border border-[#303030]">
            <TableHeader className="bg-[#303030]">
                <TableRow className="border-none">{headers}</TableRow>
            </TableHeader>
            <TableBody>{body && body}</TableBody>
        </Table>
    );
}

//@ts-ignore
export async function dataSetLoader({ params }) {
    const res = await axios.get(
        `${DOMAIN}/api/v0/datasets/${params.project_id}`
    );
    return res.data;
}
