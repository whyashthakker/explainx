import React from "react";
import { auth, signOut } from "../../../../auth";
export default async function page() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      protected page
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Sign out</button>
      </form>
    </div>
  );
}
