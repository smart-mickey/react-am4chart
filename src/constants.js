export const HOST_NAME_LIST = [
    {
        value: 'logic-test-01',
        label: 'Host 1'
    },
    {
        value: 'logic-test-02',
        label: 'Host 2'
    }
];
export const CPU_METRICS = [
    {
        value: 'Linux_CPU.check_nrpe.perfdata.idle.value',
        label: 'Idle'
    },
    {
        value: 'Linux_CPU.check_nrpe.perfdata.user.value',
        label: 'User'
    },
    {
        value: 'Linux_CPU.check_nrpe.perfdata.system.value',
        label: 'System'
    },
    {
        value: 'Linux_CPU.check_nrpe.perfdata.iowait.value',
        label: 'IOwait'
    },
    {
        value: 'Linux_CPU.check_nrpe.perfdata.steal.value',
        label: 'Steal'
    }
];
export const NETWORK_USAGES = [
    {
        value: 'Linux_Network.check_nrpe.perfdata.eth0_txbyt.value',
        label: 'Txbyt'
    },
    {
        value: 'Linux_Network.check_nrpe.perfdata.eth0_txerrs.value',
        label: 'Txerrs'
    },
    {
        value: 'Linux_Network.check_nrpe.perfdata.eth0_rxbyt.value',
        label: 'Rxbyt'
    },
    {
        value: 'Linux_Network.check_nrpe.perfdata.eth0_rxerrs.value',
        label: 'Rxerrs'
    },
];
export const MEMORY_METRICS = [
    {
        value: 'Linux_Memory.check_nrpe.perfdata.Active.value',
        label: 'Active'
    },
    {
        value: 'Linux_Memory.check_nrpe.perfdata.MemUsed.value',
        label: 'Memory Used'
    },
    {
        value: 'Linux_Memory.check_nrpe.perfdata.MemCached.value',
        label: 'Memory Cached'
    },
    {
        value: 'Linux_Memory.check_nrpe.perfdata.Swapused.value',
        label: 'Swap Used'
    },
    {
        value: 'Linux_Memory.check_nrpe.perfdata.SwapCached.value',
        label: 'Swap Cached'
    },
]

export const LAST_TIME_OPTIONS = [
    {
        value: '-1h',
        label: 'Last 1 hour'
    },
    {
        value: '-2h',
        label: 'Last 2 hours'
    },
    {
        value: '-3h',
        label: 'Last 3 hours'
    },
]

export const CPU_CHART_DIV = 'cpu-chart';
export const NETWORK_CHART_DIV = 'network-chart';
export const MEMORY_CHART_DIV = 'memory-chart';
