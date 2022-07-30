import { OneDollar } from 'OneDollar.js';

// Voir ici pour le détails de options https://github.com/nok/onedollar-unistroke-coffee#options
const options = {
  score: 80, // The similarity threshold to apply the callback(s)
  parts: 64, // The number of resampling points
  step: 2, // The degree of one single rotation step
  angle: 45, // The last degree of rotation
  size: 250, // The width and height of the scaling bounding box
};
const recognizer = new OneDollar(options);

// Let's "teach" two gestures to the recognizer:
recognizer.add('triangle', [
  [627, 213],
  [626, 217],
  [617, 234],
  [611, 248],
  [603, 264],
  [590, 287],
  [552, 329],
  [524, 358],
  [489, 383],
  [461, 410],
  [426, 444],
  [416, 454],
  [407, 466],
  [405, 469],
  [411, 469],
  [428, 469],
  [453, 470],
  [513, 478],
  [555, 483],
  [606, 493],
  [658, 499],
  [727, 505],
  [762, 507],
  [785, 508],
  [795, 508],
  [796, 505],
  [796, 503],
  [796, 502],
  [796, 495],
  [790, 473],
  [785, 462],
  [776, 447],
  [767, 430],
  [742, 390],
  [724, 362],
  [708, 340],
  [695, 321],
  [673, 289],
  [664, 272],
  [660, 263],
  [659, 261],
  [658, 256],
  [658, 255],
  [658, 255],
]);
recognizer.add('circle', [
  [621, 225],
  [616, 225],
  [608, 225],
  [601, 225],
  [594, 227],
  [572, 235],
  [562, 241],
  [548, 251],
  [532, 270],
  [504, 314],
  [495, 340],
  [492, 363],
  [492, 385],
  [494, 422],
  [505, 447],
  [524, 470],
  [550, 492],
  [607, 523],
  [649, 531],
  [689, 531],
  [751, 523],
  [782, 510],
  [807, 495],
  [826, 470],
  [851, 420],
  [859, 393],
  [860, 366],
  [858, 339],
  [852, 311],
  [833, 272],
  [815, 248],
  [793, 229],
  [768, 214],
  [729, 198],
  [704, 191],
  [678, 189],
  [655, 188],
  [623, 188],
  [614, 188],
  [611, 188],
  [611, 188],
]);
recognizer.add('next', [
  [0.30666666666666664, 0.23333333333333334],
  [0.30666666666666664, 0.23333333333333334],
  [0.3207201927775519, 0.2427023507405902],
  [0.33477371888843727, 0.2520713681478471],
  [0.33666666666666667, 0.25333333333333335],
  [0.33666666666666667, 0.25333333333333335],
  [0.34835882365804993, 0.2621024510768708],
  [0.36187101272308164, 0.2722365928756446],
  [0.37538320178811335, 0.2823707346744184],
  [0.38889539085314506, 0.29250487647319223],
  [0.40240757991817677, 0.30263901827196604],
  [0.4159197689832085, 0.31277316007073985],
  [0.42943195804824025, 0.32290730186951366],
  [0.442944147113272, 0.3330414436682875],
  [0.4564563361783038, 0.3431755854670613],
  [0.46996852524333554, 0.3533097272658351],
  [0.4834807143083673, 0.3634438690646089],
  [0.4969929033733991, 0.3735780108633827],
  [0.5105050924384308, 0.38371215266215647],
  [0.5240172815034625, 0.3938462944609302],
  [0.5375294705684942, 0.403980436259704],
  [0.55, 0.41333333333333333],
  [0.5509207057381931, 0.4142540390715264],
  [0.5628639063838914, 0.42619723971722473],
  [0.5748071070295897, 0.43814044036292304],
  [0.5833333333333334, 0.44666666666666666],
  [0.587199198498672, 0.4495660655406706],
  [0.6007113875637037, 0.4597002073394444],
  [0.61, 0.4666666666666667],
  [0.6142235766287354, 0.4698343491382182],
  [0.6277357656937671, 0.479968490936992],
  [0.6366666666666667, 0.4866666666666667],
  [0.642099406037371, 0.4884775797902348],
  [0.6566666666666666, 0.49333333333333335],
  [0.6579438600232926, 0.494184795571084],
  [0.6719973861341779, 0.5035538129783409],
  [0.6766666666666666, 0.5066666666666667],
  [0.6879451262048184, 0.5066666666666667],
  [0.69, 0.5066666666666667],
  [0.69, 0.52],
  [0.6892039261146755, 0.5212737182165191],
  [0.6802521187626888, 0.5355966099796979],
  [0.6733333333333333, 0.5466666666666666],
  [0.6707672527957997, 0.5495178672639262],
  [0.6594682803813988, 0.562072281057705],
  [0.6481693079669979, 0.5746266948514838],
  [0.6433333333333333, 0.58],
  [0.6371483879113844, 0.5874219345063387],
  [0.6263355221054465, 0.6003973734734641],
  [0.6155226562995086, 0.6133728124405896],
  [0.61, 0.62],
  [0.6052611529626151, 0.6267697814819785],
  [0.595575238439223, 0.6406068022296814],
  [0.5866666666666667, 0.6533333333333333],
  [0.5856253232400189, 0.6542011195222064],
  [0.5726498842728935, 0.6650139853281443],
  [0.559674445305768, 0.6758268511340821],
  [0.5466990063386427, 0.68663971694002],
  [0.5466666666666666, 0.6866666666666666],
  [0.5355720891636553, 0.6993461838129654],
  [0.5244497907115128, 0.7120573820439854],
  [0.5233333333333333, 0.7133333333333334],
  [0.5125889923062059, 0.7240776743604608],
  [0.5006457916605076, 0.7360208750061591],
  [0.49666666666666665, 0.74],
  [0.48990892438749345, 0.7490103230388977],
  [0.47977478258871964, 0.7625225121039294],
  [0.4766666666666667, 0.7666666666666667],
  [0.4706418991815053, 0.7767079458086024],
  [0.4619519442808889, 0.7911912039762963],
  [0.45666666666666667, 0.8],
  [0.4531593970073819, 0.8056116314548557],
  [0.44420758965539514, 0.8199345232180344],
  [0.44, 0.8266666666666667],
  [0.43462917677167834, 0.8338277643044288],
  [0.43, 0.84],
  [0.4223659870481428, 0.8450893419679048],
  [0.42, 0.8466666666666667],
  [0.4115719957250587, 0.8579040056999216],
  [0.41, 0.86],
  [0.40143785392628495, 0.8714161947649534],
  [0.4, 0.8733333333333333],
  [0.3897513264570214, 0.8835820068763119],
  [0.38666666666666666, 0.8866666666666667],
  [0.37666666666666665, 0.8933333333333333],
  [0.376306491667311, 0.8936935083326889],
  [0.37, 0.9],
  [0.36666666666666664, 0.9066666666666666],
  [0.36630042045522665, 0.9070329128781066],
  [0.36, 0.9133333333333333],
  [0.35333333333333333, 0.9133333333333333],
  [0.3520199037251448, 0.9133333333333333],
  [0.35, 0.9133333333333333],
  [0.35, 0.92],
  [0.3466666666666667, 0.92],
  [0.344488587710592, 0.9243561579121494],
  [0.34, 0.9333333333333333],
  [0.3383377944419241, 0.9399821555656371],
  [0.33666666666666667, 0.9466666666666667],
  [0.33666666666666667, 0.9533333333333334],
  [0.33333333333333337, 0.9533333333333334],
  [0.3333333333333333, 0.9533333333333334]]);

recognizer.add('previous', [
  [0.6633333333333333, 0.15333333333333332],
  [0.6633333333333333, 0.15333333333333332],
  [0.6566666666666666, 0.16],
  [0.6508077259244628, 0.16836991534600546],
  [0.639542130349533, 0.18446362331019084],
  [0.6333333333333333, 0.19333333333333333],
  [0.6333333333333333, 0.19333333333333333],
  [0.6280425253752161, 0.2003877439441562],
  [0.6162556008955238, 0.21610364325041262],
  [0.6044686764158315, 0.23181954255666903],
  [0.5926817519361391, 0.24753544186292545],
  [0.5808948274564468, 0.26325134116918186],
  [0.5691079029767545, 0.2789672404754383],
  [0.5573209784970622, 0.29468313978169475],
  [0.5455340540173699, 0.3103990390879512],
  [0.5337471295376776, 0.3261149383942076],
  [0.5219602050579852, 0.341830837700464],
  [0.5101732805782929, 0.35754673700672046],
  [0.5033333333333333, 0.36666666666666664],
  [0.4975032647515751, 0.3724967352484249],
  [0.4836122410367015, 0.3863877589632985],
  [0.48333333333333334, 0.38666666666666666],
  [0.4726551110004172, 0.4026840001660409],
  [0.47, 0.4066666666666667],
  [0.4633333333333333, 0.4066666666666667],
  [0.4584183505098568, 0.4132199770979687],
  [0.4533333333333333, 0.42],
  [0.4433427197941414, 0.42499530676959596],
  [0.4266666666666667, 0.43333333333333335],
  [0.4257718102059759, 0.4337807615636788],
  [0.4082009006178103, 0.44256621635776155],
  [0.4, 0.44666666666666666],
  [0.39152769007827315, 0.45282834660974075],
  [0.3756401714954669, 0.4643829055790544],
  [0.36333333333333334, 0.47333333333333333],
  [0.3603415613646285, 0.4765970845719204],
  [0.34706703608895834, 0.4910783848726515],
  [0.33379251081328815, 0.5055596851733826],
  [0.32666666666666666, 0.5133333333333333],
  [0.32057949646783696, 0.5200968557764775],
  [0.3074377685158179, 0.5346987757231654],
  [0.2966666666666667, 0.5466666666666666],
  [0.29416087568284277, 0.5491724576504906],
  [0.2833333333333333, 0.56],
  [0.28026985196796916, 0.5630634813653642],
  [0.26637882825309556, 0.5769545050802378],
  [0.25666666666666665, 0.5866666666666667],
  [0.25338849750704306, 0.5915839204061021],
  [0.24333333333333335, 0.6066666666666667],
  [0.2418156642062723, 0.6066666666666667],
  [0.24, 0.6066666666666667],
  [0.23666666666666666, 0.6066666666666667],
  [0.23666666666666666, 0.6133333333333333],
  [0.23666666666666666, 0.62],
  [0.23748870888915163, 0.6208220422224849],
  [0.25137973260402524, 0.6347130659373585],
  [0.26527075631889885, 0.6486040896522322],
  [0.27, 0.6533333333333333],
  [0.2811917358147317, 0.6598618458919269],
  [0.2981605636014675, 0.6697603287675227],
  [0.31512939138820323, 0.6796588116431186],
  [0.33209821917493904, 0.6895572945187144],
  [0.3490670469616748, 0.6994557773943103], [0.35, 0.7],
  [0.36458248871170496, 0.7114892335304341],
  [0.3800133737449936, 0.7236469005263585],
  [0.39544425877828226, 0.7358045675222828],
  [0.4108751438115709, 0.7479622345182072],
  [0.4263060288448595, 0.7601199015141317],
  [0.4417369138781482, 0.772277568510056],
  [0.4571677989114368, 0.7844352355059805],
  [0.46, 0.7866666666666666],
  [0.47252453677143125, 0.7966862960838116],
  [0.487864606247185, 0.8089583516644145],
  [0.5032046757229387, 0.8212304072450176],
  [0.51, 0.8266666666666667],
  [0.517737595868141, 0.8344042625348077],
  [0.5316286195830147, 0.8482952862496813],
  [0.5455196432978883, 0.8621863099645549],
  [0.5594106670127619, 0.8760773336794285],
  [0.5633333333333334, 0.88],
  [0.5747343982651032, 0.8882916835867417],
  [0.5906219168479094, 0.8998462425560554],
  [0.6, 0.9066666666666666],
  [0.6066970891632303, 0.9111313927754868],
  [0.6230426124676735, 0.9220284083117823],
  [0.6393881357721166, 0.9329254238480778],
  [0.64, 0.9333333333333333],
  [0.6533710391085992, 0.9467043724419325],
  [0.6666666666666666, 0.96],
  [0.6673672674255603, 0.9604670671725958],
  [0.6837127907300035, 0.9713640827088913],
  [0.6866666666666666, 0.9733333333333334],
  [0.6933333333333334, 0.98],
  [0.6966666666666667, 0.98],
  [0.7, 0.98]]);

export default recognizer;
