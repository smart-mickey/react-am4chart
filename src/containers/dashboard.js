import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import './dashboard.css';
import {
    CPU_CHART_DIV,
    CPU_METRICS,
    HOST_NAME_LIST,
    LAST_TIME_OPTIONS,
    MEMORY_CHART_DIV,
    NETWORK_CHART_DIV,
    NETWORK_USAGES
} from '../constants';
import { Context as DashboardContext } from '../context/dashboard'
import CpuChart from './components/CpuChart';
import NetworkChart from './components/NetworkChart';
import MemoryChart from './components/MemoryChart';
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'gray',
        backgroundColor: state.isSelected ? 'blue' : state.isFocused ? 'lightblue' : 'white',
        padding: '5px 20px',
        fontSize: 15,
        textAlign: 'left'
    }),
    control: (provided, state) => ({
        ...provided,
        fontSize: 15,
        height: 'auto',
    }),
    container: (provided, state) => ({
        ...provided,
        width: 150
    }),
}

function Dashboard() {
    const [selectedHost, selectHost] = useState(HOST_NAME_LIST[0]);

    // metric options for cpu and network graph
    const [cpuMetric, setCpuMetric] = useState(CPU_METRICS[0]);
    const [networkUsage, setNetworkUsage] = useState(NETWORK_USAGES[0]);

    // instances for cpu, network and memory graph
    const [cpuGraphInstance, setCpuGraphInstance] = useState(null)
    const [networkGraphInstance, setNetworkGraphInstance] = useState(null)
    const [memoryGraphInstance, setMemoryGraphInstance] = useState(null)

    // duration options for cpu and network graph
    const [cpuDuration, setCpuDuration] = useState(LAST_TIME_OPTIONS[0]);
    const [networkDuration, setNetworkDuration] = useState(LAST_TIME_OPTIONS[0])

    const { getGraphData, state: { cpuData, networkData, memoryData } } = useContext(DashboardContext)
    let interval = null

    useEffect(() => {
        setTimeout(() => {
            setCpuGraphInstance(am4core.create(CPU_CHART_DIV, am4charts.XYChart))
            setNetworkGraphInstance(am4core.create(NETWORK_CHART_DIV, am4charts.XYChart))
            setMemoryGraphInstance(am4core.create(MEMORY_CHART_DIV, am4charts.PieChart))
        }, 3000)
        return () => {
            cpuGraphInstance.dispose()
            networkGraphInstance.dispose()
            memoryGraphInstance.dispose()
        }
    }, []);

    useEffect(() => {
        if (!cpuGraphInstance) return;
        cpuGraphInstance.data = cpuData.map((i) => ({ value: i[0], timestamp: i[1] }))
    }, [cpuGraphInstance, cpuData])

    useEffect(() => {
        if (!networkGraphInstance) return;
        networkGraphInstance.data = networkData.map((i) => ({ value: i[0], timestamp: i[1] }))
    }, [networkGraphInstance, networkData])

    useEffect(() => {
        if (!networkGraphInstance) return;
        memoryGraphInstance.data = memoryData;
    }, [memoryGraphInstance, memoryData])

    useEffect(() => {
        interval && clearInterval(interval)
        updateGraphData();
        interval = setInterval(() => {
            updateGraphData();
        }, 60000);
        return () => clearInterval(interval);
    }, [selectedHost, cpuMetric, networkUsage, cpuDuration, networkDuration])

    const updateGraphData = () => {
        getGraphData({
            host: selectedHost.value,
            cpu: cpuMetric.value,
            network: networkUsage.value,
            cpuLastTime: cpuDuration.value,
            networkLastTime: networkDuration.value
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <div id="host-selector">
                    <p className="labelText">Select Host</p>
                    <Select
                        defaultValue={selectedHost}
                        styles={customStyles}
                        value={selectedHost}
                        onChange={(host) => selectHost(host)}
                        options={HOST_NAME_LIST}
                        isSearchable={false}
                    />
                </div>
                <div className="graph-container">
                    <div id="cpu-network">
                        <div id="cpu-status">
                            <div className="cpu-metric-selector">
                                <p className="labelText">CPU</p>
                                <Select
                                    defaultValue={cpuMetric}
                                    styles={customStyles}
                                    value={cpuMetric}
                                    onChange={(metric) => setCpuMetric(metric)}
                                    options={CPU_METRICS}
                                    isSearchable={false}
                                />

                            </div>
                            <CpuChart
                                instance={cpuGraphInstance}
                                onSelectDuration={option => setCpuDuration(option)}
                            />
                        </div>
                        <div id="network-status">
                            <div className="cpu-metric-selector">
                                <p className="labelText">Network</p>
                                <Select
                                    defaultValue={networkUsage}
                                    styles={customStyles}
                                    value={networkUsage}
                                    onChange={(metric) => setNetworkUsage(metric)}
                                    options={NETWORK_USAGES}
                                    isSearchable={false}
                                />
                            </div>
                            <NetworkChart
                                instance={networkGraphInstance}
                                onSelectDuration={option => setNetworkDuration(option)}
                            />
                        </div>
                    </div>
                    <div id="memory-chart-container">
                        <p className="labelText">Memory</p>
                        <MemoryChart instance={memoryGraphInstance} />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Dashboard;
