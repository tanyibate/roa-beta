import React from "react";
import { getSession, useSession, signOut } from "next-auth/client";

export default function test({ user }) {
  const [session] = useSession();

  return (
    <div>
      <h1
        onClick={() =>
          signOut({ callbackUrl: "http://localhost:3000/nextlogin" })
        }
      >
        {JSON.stringify(user)}
      </h1>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {};
  }

  return {
    props: {
      user: session,
    },
  };
}
