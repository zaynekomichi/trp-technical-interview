import CurrentStateOB from "./OrderBookView/CurrentStateOB/page"

export default function Home() {

  return (

    <div className="container-full">
      <div className="flex flex-row">

        <div className="col-sm">
          <CurrentStateOB />
        </div>
      </div>
    </div>

  )
}
