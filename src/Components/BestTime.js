import React from 'react'

export default function BestTime() {
  return (
    <>
        my best time:{" "}
        {localStorage.getItem("seconds") !== null
          ? localStorage.getItem("seconds")
          : "0"}
        .
        {localStorage.getItem("miliSeconds") !== null
          ? localStorage
              .getItem("miliSeconds")
              .substring(0, localStorage.getItem("miliSeconds").length - 1)
          : "00"}
        s!
    </>
  )
}
