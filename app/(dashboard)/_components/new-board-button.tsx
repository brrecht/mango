"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";

import { Plus } from "lucide-react";


interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
};

export const NewBoardButton = ({
    orgId,
    disabled,
}: NewBoardButtonProps) => {
    const router = useRouter();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        })

            .then((id) => {

                toast.success("Board created");
                router.push(`/board/${id}`);

            })

            .catch(() => toast.error("Failed to create board"));
    };


    return (
        <button
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-gray-900 rounded-lg hover:bg-gray-800 flex flex-col items-center justify-center py-6",
                (pending || disabled) && "opacity-75 hover:bg-zinc-800 cursor-not-allowed"
            )}
        >
            <div />
            <Plus className="h-12 w-12 text-white stroke-1 " />
            <p className="text-sm text-white font-medium">
                New Board
            </p>
        </button>
    );
};