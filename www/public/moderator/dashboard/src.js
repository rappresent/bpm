$(document).ready(function(){

	// modal detail 
	var modal = new Modal({
        title : "Prompt",
        backdrop : true,
        handler : {
            OK : {class : "btn-success"},
            Cancel : {class : "btn-default", dismiss : true}
        }
    });

	// bar chart, flot library
	var barOptions = {
        series: {
            bars: {
                show: true,
                barWidth: 0.6,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.8
                    }, {
                        opacity: 0.8
                    }]
                }
            }
        },
		xaxis: {
		    axisLabel: "Bulan",
		    axisLabelUseCanvas: true,
		    axisLabelFontSizePixels: 12,
		    axisLabelFontFamily: 'Verdana, Arial',
		    axisLabelPadding: 10,
		    ticks: [[0, "Januari"], [1, "Februari"], [2, "Maret"], [3, "April"],[4, "Mei"], [5, "Juni"], [6, "Juli"], [7, "Agustus"], [8, "September"], [9, "Oktober"], [10, "November"], [11, "Desember"]]
		},
		yaxis: {
		    axisLabel: "Jumlah Laporan",
		    axisLabelUseCanvas: true,
		    axisLabelFontSizePixels: 12,
		    axisLabelFontFamily: 'Verdana, Arial',
		    axisLabelPadding: 3,
		    tickFormatter: function (v, axis) {
		        return v + "";
		    }
		},
        colors: ["#1ab394"],
        grid: {
            color: "#999999",
            hoverable: true,
            clickable: true,
            tickColor: "#D4D4D4",
            borderWidth:0
        },
        legend: {
            show: false
        },
        tooltip: true,
        tooltipOpts: {
            content: "%y laporan"
        }
    };
    var barData = {
        label: "bar",
        data: [[0, 11],[1, 15],[2, 25],[3, 24],[4, 13],[5, 18], [6, 27], [7, 42], [8, 35]]
            
    };
    $.plot($("#flot-bar-chart"), [barData], barOptions);


    // event tombol detail
    $('a[detailbtn]').off('click');
    $('a[detailbtn]').on('click', function(){
    	var title = $(this).children().last().children().last().html();
    	modal.setTitle('Detail ' + title);
    	modal.setBody('<div id="pie-detail"></div>').show();

    	// pie chart
    	setTimeout(function(){
    		c3.generate({
		        bindto: '#pie-detail',
		        data:{
		            columns: [
		                ['Umum', 30],
		                ['Kemacetan', 120],
		                ['Kesehatan', 68]
		            ],
		            colors:{
		                //data1: '#1ab394',
		                //data2: '#BABABA'
		            },
		            type : 'pie'
		        },
		        pie: {
				    label: {
				      	format: function(value, ratio, id) {
				        	return value;
				      }
				    }
			  	}
		    });
		    console.log("rendered");
    	}, 300);
    	// pie chart done
        modal.$buttons.OK.off("click");
        modal.$buttons.OK.on("click", function () {
            console.log("olalaaaa");
        });
    });
});