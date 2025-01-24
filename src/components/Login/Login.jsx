import { useState } from "react";
import { classNames } from "primereact/utils";

import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import axios from "axios";

import decrypt from "../../helper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center overflow-hidden"
  );

  const handleSignIn = async () => {
    try {
      const credentials = {
        login: email,
        password: password,
      };

      console.log("import.meta.env.VITE_API_URL", import.meta.env.VITE_API_URL);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/admin/login",
        credentials
      );
      console.log("response", response);

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("data", data);

      alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <div className={containerClassName}>
        <div className="flex flex-column h-screen align-items-center justify-content-center">
          <div
            style={{
              borderRadius: "56px",
              padding: "0.3rem",
              background:
                "linear-gradient(180deg, #00052e 10%, rgba(0, 5, 46, 0) 30%)",
            }}
          >
            <div
              className="w-full surface-card py-8 px-5 sm:px-8"
              style={{ borderRadius: "53px" }}
            >
              <div className="text-center mb-5">
                <div className="text-900 text-3xl font-medium mb-3">
                  Welcome, Admin!
                </div>
                <span className="text-600 font-medium">
                  Sign in to continue
                </span>
              </div>

              <div>
                <label
                  htmlFor="email1"
                  className="block text-900 text-xl font-medium mb-2"
                >
                  Email
                </label>
                <InputText
                  id="email1"
                  type="text"
                  placeholder="Email address"
                  className="w-full md:w-30rem mb-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: "1rem" }}
                />

                <label
                  htmlFor="password1"
                  className="block text-900 font-medium text-xl mb-2"
                >
                  Password
                </label>
                <Password
                  inputId="password1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  toggleMask
                  className="w-full mb-5"
                  inputClassName="w-full p-3 md:w-30rem"
                ></Password>

                <div className="flex align-items-center justify-content-between mb-5 gap-5">
                  <div className="flex align-items-center">
                    <Checkbox
                      inputId="rememberme1"
                      checked={checked}
                      onChange={(e) => setChecked(e.checked ?? false)}
                      className="mr-2"
                    ></Checkbox>
                    <label htmlFor="rememberme1">Remember me</label>
                  </div>
                  <a
                    className="font-medium no-underline ml-2 text-right cursor-pointer"
                    style={{ color: "#00052e" }}
                  >
                    Forgot password?
                  </a>
                </div>
                <Button
                  label="Sign In"
                  className="w-full p-3 text-xl"
                  style={{
                    background: "#00052e",
                  }}
                  onClick={handleSignIn}
                  //   onClick={() => router.push("/")}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
