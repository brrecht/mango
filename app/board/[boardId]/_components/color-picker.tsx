"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
};

export const ColorPicker = ({
    onChange,
}: ColorPickerProps) => {
    return (
        <div
            className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200"
        >
            <ColorButton color={{ r: 250, g: 190, b: 30 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 130, b: 60 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 100, b: 20 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 170, b: 170 }} onClick={onChange} />
            <ColorButton color={{ r: 15, g: 190, b: 245 }} onClick={onChange} />
            <ColorButton color={{ r: 25, g: 120, b: 245 }} onClick={onChange} />
            <ColorButton color={{ r: 10, g: 110, b: 105 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
        </div>
    )
};

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
};

const ColorButton = ({
    onClick,
    color,
}: ColorButtonProps) => {
    return (
        <button
            className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
            onClick={() => onClick(color)}
        >
            <div
                className="h-8 w-8 rounded-md border border-neutral-300"
                style={{ background: colorToCss(color) }}
            />
        </button>
    )
}