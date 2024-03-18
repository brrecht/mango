import { auth, currentUser } from "@clerk/nextjs"
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";
import { request } from "http";

const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
);

const liveblocks = new Liveblocks({
    secret: "sk_dev_9mqoZgWsnuz5ZxD2MW_PIA0ajcK19V6jn8BnVx7k3lQ5ErIyLDUk7HTyFxJmldMJ",
});

export async function POST(request: Request) {
    const authorization = await auth();
    const user = await currentUser();

    console.log("AUTH_INFO", {
        authorization,
        user,
    });

    if (!authorization || !user) {
        return new Response("Unauhtorized", { status: 403 });
    }
    const { room } = await request.json();
    const board = await convex.query(api.board.get, { id: room });


    if (board?.orgId !== authorization.orgId) {
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: user.firstName || "Team Member",
        picture: user.imageUrl!,
    };



    const session = liveblocks.prepareSession(
        user.id,
        { userInfo }
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }


    const { status, body } = await session.authorize();

    return new Response(body, { status });
};