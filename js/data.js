//Data arraus
const arr_value = [13.44, 8.3, 9.2];
const arr_time = [0.01, 0.02, 0.03, 0.04];
Chart.defaults.color = '#fff';

// Data for graphs
const data1 = {
    labels: arr_time,
    datasets: [{
        label: 'Graph 1',
        data: arr_value,
        borderColor: 'blue',
        borderWidth: 1,
        backgroundColor: 'blue',
    }]
};

const data2 = {
    labels: arr_time,
    datasets: [{
        label: 'Graph 2',
        data: arr_value,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'red'
    }]
};

// Rendering graphs
const ctx1 = document.getElementById('graph1').getContext('2d');
const ctx2 = document.getElementById('graph2').getContext('2d');

const graph1 = new Chart(ctx1, {
    type: 'line',
    data: data1,
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                },
                
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size:14
                    }
                }
            }
        }
        
    }
});

const graph2 = new Chart(ctx2, {
    type: 'line',
    data: data2,
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Value'
                }
            }
        },
        
        plugins: {
            legend: {
                labels: {
                    font: {
                        size:14,
                        
                    }
                }
            }
        }
    }
});