import { Link } from "react-router-dom";

import { Props, UserDataType } from "./type";
import { ChangeEvent, FormEvent, useState } from "react";

const Form: React.FC<Props> = ({ type, onSubmit }) => {
  const [userData, setUserData] = useState<UserDataType>({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <>
      <div
        id="page-container"
        className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100"
      >
        <main id="page-content" className="flex max-w-full flex-auto flex-col">
          <div className="relative mx-auto flex min-h-dvh w-full max-w-10xl items-center justify-center overflow-hidden p-4 lg:p-8">
            <section className="w-full max-w-xl py-6">
              <header className="mb-10 text-center">
                <h2 className="text-xl font-medium">Welcome...</h2>
                <h2 className="text-sm font-medium text-gray-500">
                  please {type === "register" ? "Sign  Up" : "Sign In"} to your
                  dashboard
                </h2>
              </header>

              <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="grow p-5 md:px-16 md:py-12">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {type === "register" && (
                      <>
                        <div className="space-y-1">
                          <label
                            htmlFor="username"
                            className="text-sm font-medium"
                          >
                            Username
                          </label>
                          <input
                            type="username"
                            id="username"
                            onChange={handleChange}
                            name="username"
                            placeholder="Enter your username"
                            className="block outline-none w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                          />
                        </div>
                      </>
                    )}
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        onChange={handleChange}
                        name="email"
                        placeholder="Enter your email"
                        className="block w-full outline-none rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={handleChange}
                        name="password"
                        placeholder="Enter your password"
                        className="block w-full outline-none rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <div className="mb-5 flex items-center justify-between gap-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            id="remember_me"
                            name="remember_me"
                            className="size-4 rounded border border-gray-200 text-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50"
                          />
                          <span className="ml-2 text-sm">Remember me</span>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-6 py-3 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700"
                      >
                        <span>
                          {type === "register" ? "Sign  Up" : "Sign In"}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
                {type === "register" ? (
                  <div className="grow bg-gray-50 p-5 text-center text-sm md:px-16">
                    Already have an account ?
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-400"
                    >
                      Sign In
                    </Link>
                  </div>
                ) : (
                  <div className="grow bg-gray-50 p-5 text-center text-sm md:px-16">
                    Don’t have an account yet?
                    <Link
                      to="/register"
                      className="font-medium text-blue-600 hover:text-blue-400"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Form;
