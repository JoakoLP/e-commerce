import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordSwitch = ({ inputPass, pass }) => {
  const [visible, setVisible] = useState(false);

  const switchVisible = () => {
    if (pass !== null) {
      if (pass.type == "text") {
        setVisible(true);
        pass.type = "password";
      } else {
        setVisible(false);
        pass.type = "text";
      }
    }
  };

  return (
    <div className={`${inputPass ? "absolute" : "hidden"} right-0 flex items-center justify-center w-8 h-full`}>
      <div className="cursor-pointer select-none" onClick={switchVisible}>
        {visible ? <AiOutlineEye size={16} /> : <AiOutlineEyeInvisible size={16} />}
      </div>
    </div>
  );
};

export default PasswordSwitch;
