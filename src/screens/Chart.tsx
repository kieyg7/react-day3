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

interface IError {
    error: string
}

function Chart() {
    const {coinId} = useParams()
    const {isLoading, data} = useQuery<IChart[]>("chart", () => fetchCoinHistory(coinId ?? ''), {enabled: !!coinId, refetchInterval: 60000,})

    if(!data?.length) {
        return <Txt>{isLoading ? "Loading Chart..." : "Price data not found."}</Txt>
    }

    const chartData = data?.map(o => Number(o.close)) as number[]
    return (
        <div>
            {(isLoading || chartData.length === 0)
                ? ("Loading Chart...")
                : (<ApexChart
                    type="line"
                    series={[
                        {
                            name: "price",
                            data: chartData,
                        },
                    ]}
                    options={{
                        theme: {
                            mode: 'dark',
                        },
                        chart: {
                            width: 500,
                            height: 500,
                            toolbar: {
                                show: false,
                            },
                            background: 'transparent',
                        },
                        grid: {
                            show: false,
                        },
                        stroke: {
                            curve: 'smooth',
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: {
                                show: false,
                            },
                            axisTicks: {
                                show: false,
                            },
                            labels: {
                                show: false
                            },
                            categories: data?.map(o => new Date(o.time_close).toLocaleString())
                        },
                        fill: {
                            type: 'gradient',
                            gradient: {gradientToColors: ["#3c40c6"], stops: [0, 100]},
                        },
                        colors: ["#4bcffa"],
                         tooltip: {
                            y: {
                                formatter: (value) => `$${value.toLocaleString('us', {minimumFractionDigits:3, maximumFractionDigits: 3})}`
                            }
                         },
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

export default Chart;