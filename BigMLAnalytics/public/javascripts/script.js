$(document).ready(function () {


    var infoBlock = false;
    $(".flitskaart").click(function () {
        if (!infoBlock) {
            var div = $(".flitskaart");
            div.animate({ height: '300px', opacity: '0.4' }, "slow");
            div.animate({ width: '200px', opacity: '0.8' }, "slow");
            $(".ptext").text("Training of superheroes..... although they prefer we use the term functional and high performance training.");



            infoBlock = true;

            var div = $(".flitskaart1");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext1").text("");
            $(".ptext1").prepend('<i class="  fa fa-5x fa-wheelchair"></i>');

            infoBlock1 = false;

            var div = $(".flitskaart2");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext2").text("");
            $(".ptext2").prepend('<i class="fa fa-5x fa-stethoscope"></i>');

            infoBlock2 = false;

            var div = $(".flitskaart3");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext3").text("");
            $(".ptext3").prepend('<i class="fa fa-5x fa-user-md"></i>');

            infoBlock3 = false;
        }
        else {
            var div = $(".flitskaart");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext").text("");
            $(".ptext").prepend('<i class="  fa fa-4x fa-heartbeat"></i>');

            infoBlock = false;
        }

    });

    var infoBlock1 = false;
    $(".flitskaart1").click(function () {
        if (!infoBlock1) {
            var div = $(".flitskaart1");
            div.animate({ height: '400px', opacity: '0.4' }, "slow");
            div.animate({ width: '200px', opacity: '0.8' }, "slow");
            $(".ptext1").text("Orthopeadic rehabilitation... This is when we give specific exercises to someone with back pain or knee pain etc. so they can get back to their normal lives and be awesome.");

            infoBlock1 = true;
            var div = $(".flitskaart2");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext2").text("");
            $(".ptext2").prepend('<i class="fa fa-5x fa-stethoscope"></i>');

            infoBlock2 = false;

            var div = $(".flitskaart3");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext3").text("");
            $(".ptext3").prepend('<i class="fa fa-5x fa-user-md"></i>');

            infoBlock3 = false;

            var div = $(".flitskaart");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext").text("");
            $(".ptext").prepend('<i class="  fa fa-4x fa-heartbeat"></i>');

            infoBlock = false;
        }
        else {
            var div = $(".flitskaart1");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext1").text("");
            $(".ptext1").prepend('<i class="  fa fa-5x fa-wheelchair"></i>');

            infoBlock1 = false;
        }

    });
    var infoBlock2 = false;
    $(".flitskaart2").click(function () {
        if (!infoBlock2) {
            var div = $(".flitskaart2");
            div.animate({ height: '400px', opacity: '0.4' }, "slow");
            div.animate({ width: '200px', opacity: '0.8' }, "slow");
            $(".ptext2").text("Chronic disease does not mean the end of the world, it just means that you are playing life on hard mode. We can give you some expert exercises to get you ready for the challenge.");

            infoBlock2 = true;

            var div = $(".flitskaart1");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext1").text("");
            $(".ptext1").prepend('<i class="  fa fa-5x fa-wheelchair"></i>');

            infoBlock1 = false;

            var div = $(".flitskaart3");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext3").text("");
            $(".ptext3").prepend('<i class="fa fa-5x fa-user-md"></i>');

            infoBlock3 = false;

            var div = $(".flitskaart");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext").text("");
            $(".ptext").prepend('<i class="  fa fa-4x fa-heartbeat"></i>');

            infoBlock = false;
        }
        else {
            var div = $(".flitskaart2");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext2").text("");
            $(".ptext2").prepend('<i class="fa fa-5x fa-stethoscope"></i>');

            infoBlock2 = false;
        }

    });

    var infoBlock3 = false;
    $(".flitskaart3").click(function () {
        if (!infoBlock3) {
            var div = $(".flitskaart3");
            div.animate({ height: '400px', opacity: '0.4' }, "slow");
            div.animate({ width: '180px', opacity: '0.8' }, "slow");
            $(".ptext3").text("We have studied the posture, body compositions and running styles of the top athletes in South Africa. We use this information to analyse our client and provide useful advice and expert exercises.");

            infoBlock3 = true;

            var div = $(".flitskaart1");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext1").text("");
            $(".ptext1").prepend('<i class="  fa fa-5x fa-wheelchair"></i>');

            infoBlock1 = false;

            var div = $(".flitskaart2");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext2").text("");
            $(".ptext2").prepend('<i class="fa fa-5x fa-stethoscope"></i>');

            infoBlock2 = false;

            var div = $(".flitskaart");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext").text("");
            $(".ptext").prepend('<i class="  fa fa-4x fa-heartbeat"></i>');

            infoBlock = false;
        }
        else {
            var div = $(".flitskaart3");
            div.animate({ height: '150px', opacity: '0.4' }, "slow");
            div.animate({ width: '150px', opacity: '0.8' }, "slow");
            $(".ptext3").text("");
            $(".ptext3").prepend('<i class="fa fa-5x fa-user-md"></i>');

            infoBlock3 = false;
        }

    });
});