import { useEffect, useState } from "react";
import LoadingMask from "./LoadingMask";

const Subscription = (props) => {
  const [sending, setSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [email, setEmail] = useState("");

  const isEmailValid = () => email.includes("@") && email.includes(".");

  useEffect(() => {
    if (sending && hasSent) {
      const interval = setInterval(() => {
        props.setSubscriptionIsOpen(false);
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [sending, hasSent]);

  const sendSubscription = () => {
    setSending(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };

    fetch(`https://demoapi.com/api/series/newsletter`, options)
      .then((data) => data.json())
      .then((parsedData) => {
        if (parsedData.done) {
          setHasSent(true);
        } else {
          setHasSent(false);
          setSending(false);
        }
      });
  };

  return (
    <div>
      {!sending && !hasSent ? (
        <>
          <h3>Subscribe to our newsletter</h3>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button disabled={!isEmailValid()} onClick={sendSubscription}>
            Subscribe
          </button>
        </>
      ) : null}

      {sending && !hasSent ? <LoadingMask /> : null}

      {sending && hasSent ? "Subscribed" : null}
    </div>
  );
};

export default Subscription;
