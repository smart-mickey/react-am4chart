import React, { useEffect } from 'react';
import * as am4charts from "@amcharts/amcharts4/charts"
import { MEMORY_CHART_DIV } from '../../constants';

function CpuChart({ instance }) {
    useEffect(() => {
        if (!instance) return;
        const x = instance
        // Add and configure Series
        var pieSeries = x.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "percentage";
        pieSeries.dataFields.category = "status";
        pieSeries.slices.template.propertyFields.fill = "color";
        pieSeries.fontSize = 10
        pieSeries.sequencedInterpolation = true

        // Disabling labels and ticks on inner circle
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;

        pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
        pieSeries.slices.template.states.getKey("hover").properties.scale = 1.1;
        x.legend = new am4charts.Legend();
        x.legend.fontSize = 12;
        x.legend.position = 'right'
    }, [instance])

    return (
        <div className="memory-chart-card">
            <div className="chart-area">
                <div id={MEMORY_CHART_DIV} style={{ width: "100%", height: "250px" }}></div>
            </div>
        </div>
    )
}

export default CpuChart;