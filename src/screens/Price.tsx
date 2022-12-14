import {useQuery} from "react-query";
import {fetchCoinHistory} from "../Api";
import {useParams} from "react-router-dom";
import ApexChart from 'react-apexcharts';
import styled from "styled-components";

interface IChart {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

type IChartData = {x: number, y: string[]}[]

function Price() {
    const {coinId} = useParams<{coinId: string}>()
    const {isLoading, data} = useQuery<IChart[]>("chart", () => fetchCoinHistory(coinId ?? ''), )

    if(!data?.length) {
        return <Txt>{isLoading ? "Loading Chart..." : "Price data not found."}</Txt>
    }

    const chartData: IChartData = data?.map(o => {
        return {
            x: o.time_close,
            y: [o.open, o.high, o.low, o.close]
        }
    }) ?? [];

    return (
        <div>
            {(isLoading || !data)
                ? ("Loading Chart...")
                : (<ApexChart
                    type="candlestick"
                    series={[
                        {data: chartData},

                    ]}
                    options={{
                        chart: {
                            width: 500,
                            height: 500,
                        },
                        xaxis: {
                            type: 'datetime',
                            labels: {
                                style: {
                                    colors: '#fff'
                                }
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: '#fff'
                                }
                            }
                        }
                    }}
                />)
            }
        </div>
    )
}

const Txt = styled.div`
  padding: 30px;
  text-align: center;
`;

export default Price;