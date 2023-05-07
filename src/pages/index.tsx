import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton, SignedOut, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();
  const {data} = api.posts.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div>
              <p>esto es una prueba</p>
              {!user.isSignedIn && <SignInButton />}
              {!!user.isSignedIn &&  <SignedOut/>}
            </div>
            <div>
              {data?.map((item) => (<div key={item.id}>{item.content}</div>))}
            </div>
          </div>
          <p className="text-2xl text-white">
            {data ? data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
