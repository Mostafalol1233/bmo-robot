# ملاحظات مراجع BMO

## مرجع نموذج BMO ثلاثي الأبعاد
المصدر: https://joshuawinn.com/bmo-3d-css-beemo-adventure-time/

يوضح المرجع أن نموذج BMO يمكن بناؤه بالكامل باستخدام CSS ثلاثي الأبعاد، مع الاعتماد على `transform-style: preserve-3d` للعناصر المتداخلة، و`backface-visibility: hidden` لتقليل اختفاء الأسطح والوميض، وترتيب التحويلات بحيث يسبق النقل الدوران عند الحاجة. الشكل المستهدف يتضمن جسمًا مستطيلاً بحواف مستديرة/مشطوفة، شاشة أمامية، أزرارًا بارزة، وأذرعًا وأرجلًا منخفضة التفاصيل. كما يذكر المرجع أن تعبيرات العينين يمكن تحريكها بتوقيت متدرج، وأن بعض مشاكل الفجوات والوميض متوقعة في CSS ثلاثي الأبعاد، لذلك يجب إبقاء النموذج بسيطًا ومتوافقًا مع المتصفحات.

## اتجاه التصميم المطلوب من المستخدم
- جسم BMO أخضر مائل للنعناع، وليس كحليًا.
- شاشة وجه كبيرة بلون أخضر فاتح.
- أزرار أمامية ملونة وبارزة مع فتحة القرص ومنافذ التحكم.
- أذرع وأرجل ظاهرة، مع إضاءة واقعية وظلال ناعمة.
- الحفاظ على الصفحة الحالية والأدوات والألعاب، مع جعل جميع الأقسام ظاهرة وقابلة للوصول.
- عدم إضافة صفحة هبوط منفصلة.

## ملف Figma
الرابط: https://www.figma.com/design/Lz52Z404hQNswBUZBvq4Yg/BMO-Face-Templates-Assets--Community-?m=auto&is-community-duplicate=1&fuid=1671538872722157099
حاولت فتح الملف العام، لكن المتصفح لم يعرض محتوى مرئيًا أو عناصر قابلة للفحص في جلسة المعاينة. لذلك سيُبنى التنفيذ على الصور المرفقة من المستخدم وعلى المرجع التقني المنشور، مع عدم نسخ أصول Figma غير المتاحة.

## اختبار الظهور المرحلي

أظهرت الصفحة الرئيسية القنوات العشر كلها في الشريط الجانبي وفي شبكة القنوات. فتحت قناة الألعاب بنجاح، وظهرت ألعاب Tic Tac Toe وMaze Runner وCandy Snake وBMO Quiz مع أزرارها ومحتواها، من دون أخطاء JavaScript في وحدة التحكم.


## اختبار الألعاب والفيديوهات

فتحت قناة الألعاب وظهرت الألعاب الأربع كاملة. ثم فتحت قناة الفيديوهات وظهرت خمس بطاقات فيديو وأزرار المشاهدة وقناة Bemora، مع تمرير واضح وعدم قص المحتوى.


## اختبار الصور والحديث الذكي

ظهر معرض الصور مع Finn وJake وPrincess Bubblegum وMarceline وBMO. كما فتحت أداة الحديث الذكي وظهرت الرسالة الترحيبية وحقل الإدخال وزر الإرسال، من دون أخطاء JavaScript أو قص للمحتوى.


## اختبار البحث ويوتيوب

فتحت أداة بحث Google وظهرت خانة البحث والاقتراحات وزر التنفيذ. ثم فتحت محطة YouTube وظهرت خانة البحث وخمس قنوات فيديو وزر الانتقال إلى YouTube، لذلك الأدوات الخدمية ظاهرة وقابلة للوصول من القائمة الجانبية.


## فحص DOM والأبعاد

في الشاشة الرئيسية، أظهر الفحص البرمجي وجود 10 أزرار قنوات بالضبط. جميعها `display: flex` و`visibility: visible` و`opacity: 1` وبعرض 485px وارتفاع 108px. القنوات 01–06 داخل الإطار الأول، والقنوات 07–10 أسفلها ضمن تمرير الصفحة الطبيعي، وليست مخفية أو مقصوصة. لا توجد أخطاء JavaScript بعد إضافة `resolve.dedupe` لـ React وReact DOM.


## اختبار المجتمعات والمعلومات

فتحت قناة المجتمعات وظهرت روابط Discord وWhatsApp وX وYouTube وFacebook. ثم فتحت قناة Information وظهرت بطاقات Finn وJake وPrincess Bubblegum وMarceline وBMO مع النصوص والصور، دون اختفاء أو صفحة بيضاء.


## اختبار التواصل وأدواتي

فتحت قناة Contact Information وظهرت ستة روابط: البريد الإلكتروني وLinkedIn وDiscord وWhatsApp والملف الشخصي ومواعيد الاجتماعات. ثم فتحت Development Toolkit وظهرت روابط Material UI وTypeScript Components وFlaticon وNPM.


## تحقق Vercel النهائي

الإصدار الإنتاجي `dpl_D5rfMqB3opqp4miK5y1TzrLcLTHV` أصبح READY وعلى الرابط `bmo-robot.vercel.app`. الشاشة الرئيسية تعرض BMO ثلاثي الأبعاد والقنوات العشر. قناة الألعاب تعرض Tic Tac Toe وMaze Runner وCandy Snake وBMO Quiz. قناة الحديث الذكي تعرض رسالة BMO وحقل `Ask BMO anything...` وزر Send.


## مصادر صوت وفيديو تم التحقق منها

- https://www.youtube.com/watch?v=zfrDbtFwkf4 — قناة Cartoon Network الرسمية، فيديو Best of BMO.
- https://www.youtube.com/watch?v=XTuUoeNNrB8 — قناة Cartoon Network الرسمية، BMO The Hero من Adventure Time: Distant Lands.
- https://open.spotify.com/track/6yCO64pit51XSgcYoUAwD5 — أغنية Oh BMO، من Adventure Time Vol. 2، موضح في الصفحة أنها © 2019 Cartoon Network Music و℗ 2019 Cartoon Network Music.

النتيجة: يمكن إضافة روابط أو تضمين مشغلات للمصادر الرسمية، لكن لا ينبغي نسخ ملفات صوتية أو موسيقى محمية إلى المستودع دون ترخيص. البديل الآمن هو صوت أصلي مستوحى من أجواء وحدة ألعاب، أو تضمين المصدر الرسمي كما تسمح المنصة.

## QA update — six games local preview
- Landing page opens from the root and START reaches the BMO file explorer.
- Games channel shows six visible cards: BMO Battle, Dungeon Maze, Candy Snake, Character Quest, Cloud Jumper, and Rhythm Grid.
- BMO Battle opens a real Tic Tac Toe board after Start Game.
- Dungeon Maze opens a 10-level maze selection with progress tracking and keyboard/mobile instructions.
- Candy Snake opens a real grid game with Start Adventure, score/high score, controls, and Game Over/Play Again states.
- All tested routes returned rendered content rather than blank pages.

## QA update — Character Quest
Character Quest opens from the arcade, starts successfully, shows a countdown and the 5-item objective, and responds to keyboard movement. After pressing ArrowRight, the move counter changed from 0 to 1 and the status message updated, confirming active gameplay rather than a static quiz.

## اختبار الألعاب الست — 2026-08-20
- Cloud Jumper: فتحت شاشة اللعب، بدأت اللعبة، ظهرت السحب والنجوم والقلوب وأزرار الحركة، واستجابت للقفز عبر Space.
- Rhythm Grid: فتحت اللعبة السادسة، بدأت الإيقاع، ظهرت مسارات A/S/D/F، واستجاب الإدخال مع تسجيل حالة خارج الإيقاع عند التوقيت غير الصحيح.
- قاعة الألعاب تعرض البطاقات الستة بوضوح: BMO Battle، Dungeon Maze، Candy Snake، Character Quest، Cloud Jumper، Rhythm Grid.
- المسار الخارجي يفتح الصفحة ثم START ثم مستكشف BMO ثم قاعة الألعاب دون صفحة بيضاء.

### ملاحظة QA
تم اختبار الظهور والتنقل والتفاعل الأساسي للألعاب الست على المعاينة المحلية. يلزم الآن دفع الالتزام النهائي ونشره على Vercel، ثم إعادة اختبار الرابط العام بنفس المسارات.
