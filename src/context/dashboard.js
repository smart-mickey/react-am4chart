import createDataContext from './createDataContext';

const initialState = {
    cpuData: [],
    networkData: [],
    memory: [],
};

const dashboardReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CPU_DATA':
            return {
                ...state,
                cpuData: action.payload
            }
        case 'SET_NETWORK_DATA':
            return {
                ...state,
                networkData: action.payload
            }
        case 'SET_MEMORY_DATA':
            return {
                ...state,
                memoryData: action.payload
            }
        default:
            return state;
    }
};

export const dispatch = (dispatch) => {
    return async (action) => {
        dispatch(action);
    };
};

export const getGraphData = (dispatch) => {
    return ({ host, cpu, network, cpuLastTime, networkLastTime }) => {
        const cpuPath = `http://18.236.126.230/render?target=icinga2.${host}.services.${cpu}&from=${cpuLastTime}&format=json`;
        const networkPath = `http://18.236.126.230/render?target=icinga2.${host}.services.${network}&from=${networkLastTime}&format=json`;
        const memoryPath = `http://18.236.126.230/render?target=icinga2.${host}.services.Linux_Memory.check_nrpe.perfdata.*.value&from=-2min&format=json`;

        console.log('fetching updated data...')
        // fetch CPU data
        fetch('http://localhost:3002/data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                path: cpuPath
            })
        })
            .then(res => res.json())
            .then(json => {
                const cpuData = json[0].datapoints;
                dispatch({ type: 'SET_CPU_DATA', payload: cpuData })
            })
            .catch(function (err) {
                console.log({ err })
            });

        // fetch Network data
        fetch('http://localhost:3002/data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                path: networkPath
            })
        })
            .then(res => res.json())
            .then(json => {
                const networkData = json[0].datapoints;
                dispatch({ type: 'SET_NETWORK_DATA', payload: networkData })
            })
            .catch(function (err) {
                console.log({ err })
            });

        // fetch Memory data
        fetch('http://localhost:3002/data', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                path: memoryPath
            })
        })
            .then(res => res.json())
            .then(json => {
                const converted = json.map(i => {
                    if (i.target.includes('Active')) {
                        return {
                            percentage: i.datapoints[1][0] || i.datapoints[0][0],
                            status: 'Active',
                            color: 'lightblue'
                        }
                    } else if (i.target.includes('MemUsed')) {
                        return {
                            percentage: i.datapoints[1][0] || i.datapoints[0][0],
                            status: 'Memory Used',
                            color: 'green'
                        }
                    } else if (i.target.includes('MemCached')) {
                        return {
                            percentage: i.datapoints[1][0] || i.datapoints[0][0],
                            status: 'Memory Cached',
                            color: 'blue'
                        }
                    } else if (i.target.includes('SwapUsed')) {
                        return {
                            percentage: i.datapoints[1][0] || i.datapoints[0][0],
                            status: 'Swap Used',
                            color: 'yellow'
                        }
                    } else if (i.target.includes('SwapCached')) {
                        return {
                            percentage: i.datapoints[1][0] || i.datapoints[0][0],
                            status: 'Swap Cached',
                            color: 'pink'
                        }
                    }
                    return undefined
                })
                dispatch({ type: 'SET_MEMORY_DATA', payload: converted })
            })
            .catch(function (err) {
                console.log({ err })
            });
    };
};

export const { Provider, Context } = createDataContext(
    dashboardReducer,
    {
        getGraphData,
    },
    initialState,
);
