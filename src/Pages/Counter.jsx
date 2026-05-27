import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  decrement,
  increment,
  incrementByAmount,
} from "../store/slices/counterSlice";

import * as actions from "../store/actions";

import { globalLoaderOpen } from "../store/slices/globalSlice";
import GlobalButton from "../Components/GlobalButton";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);

  const dummyValue = useSelector((state) => state.counter.dummyValue);

  const postsValue = useSelector((state) => state.post.postalvalue);

  const loading = useSelector((state) => state.global?.globalloader?.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchPosts());
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "10px",
              color: "#0f172a",
              fontWeight: "700",
            }}
          >
            Redux Toolkit Counter
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            React + Redux Toolkit + Global Snackbar
          </p>
        </div>

        {/* Counter Card */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: "18px",
            padding: "30px",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              fontSize: "64px",
              margin: "0",
              color: "#2563eb",
              fontWeight: "700",
            }}
          >
            {count}
          </h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px",
            }}
          >
            Current Counter Value
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            <button
              onClick={() => dispatch(decrement())}
              style={{
                flex: 1,
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: "#ef4444",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Decrement
            </button>

            <button
              onClick={() => dispatch(increment())}
              style={{
                flex: 1,
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: "#2563eb",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Increment
            </button>
          </div>
        </div>

        {/* Dummy Value Section */}
        <div
          style={{
            background: "#f1f5f9",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              color: "#0f172a",
            }}
          >
            Dummy Redux State
          </h3>

          <p
            style={{
              color: "#334155",
              fontSize: "15px",
              marginBottom: "15px",
            }}
          >
            {dummyValue || "No Value Yet"}
          </p>

          <GlobalButton
            variant="secondary"
            onClick={() => dispatch(incrementByAmount("Hello WORLD"))}
          >
            Update Dummy Value
          </GlobalButton>
        </div>

        {/* Snackbar Trigger */}
        <GlobalButton
          variant="primary"
          onClick={() =>
            dispatch(
              actions.showAlert({
                type: "success",
                title: "Success",
                message: "This is a success message",
              }),
            )
          }
        >
          Submit
        </GlobalButton>

        {/* API Loader */}
        {/* <div
          style={{
            textAlign: "center",
            paddingTop: "10px",
          }}
        >
          <span
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: "600",
              background: loading ? "#fef3c7" : "#dcfce7",
              color: loading ? "#92400e" : "#166534",
            }}
          >
            {loading ? "Fetching Posts..." : "API Loaded Successfully"}
          </span>
        </div> */}
      </div>
    </div>
  );
}
