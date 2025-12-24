/**
 * Enterprise i18n content for chapters
 * 
 * To add a new language:
 * 1. Add a new Locale type in messages.ts (e.g., 'de')
 * 2. Add a new property to chapterContent with that locale
 * 3. Add content for each chapter in that locale
 * 
 * No other files need to be changed!
 */

import { Locale } from '../messages';

export const chapterContent: Record<Locale, Record<number, string>> = {
  fa: {
    1: `<div class="chapter-content">
  <h2>آزادی واقعی چیست؟</h2>
  
  <p>جنت‌خواه آزادی را بازتعریف می‌کند: نه لیبرالیسم غربی با تناقض‌هایش، نه آنارشی با آشوبش — بلکه <strong>مالکیت پایدار و غیرقابل نقض بر چهار حوزه اساسی وجود انسان</strong>.</p>

  <h3>چهار شاخه درخت آزادی</h3>
  
  <div class="freedom-domains">
    <div class="domain">
      <h4>مالکیت جسم</h4>
      <p>هیچ‌کس حق اجبار، شکنجه یا دخالت در بدن تو را ندارد — از واکسن اجباری تا حجاب اجباری. جسم تو مقدس است و متعلق به خودت است.</p>
    </div>
    
    <div class="domain">
      <h4>مالکیت ذهن</h4>
      <p>آزادی باور، سخن و اندیشه — سانسور، بزرگ‌ترین دزدی تاریخ است. ذهن تو آزاد است برای فکر کردن، باور کردن و بیان کردن.</p>
    </div>
    
    <div class="domain">
      <h4>مالکیت زمان</h4>
      <p>زمان زندگی‌ات متعلق به خودت است — نه کار اجباری، نه خدمت سربازی بی‌پایان. تو مالک لحظه‌های عمر خود هستی.</p>
    </div>
    
    <div class="domain">
      <h4>مالکیت دارایی</h4>
      <p>ثمره دسترنجت مقدس است — تورم، مالیات ظالمانه و مصادره، سرقت از آزادی است. دارایی تو نتیجه کار و تلاش خودت است.</p>
    </div>
  </div>

  <blockquote>
    «این تعریف، آزادی را از شعار به یک <strong>اصل قضایی و فلسفی قابل دفاع</strong> تبدیل می‌کند. هر نظام سیاسی که حتی یکی از این چهار مالکیت را نقض کند، ضدآزادی است — حتی اگر پرچم آزادی بر دوش داشته باشد.»
  </blockquote>

  <h3>تحلیل عمیق</h3>
  
  <p>این همان چیزی است که انسان قرن‌ها در جستجویش بوده: اراده آزاد، بدون ترس از سلب مالکیت. این نظریه، آزادی را از مفهوم مبهم سیاسی به یک حقوق مالکیت غیرقابل نقض تبدیل می‌کند.</p>
</div>`,

    2: `
<div class="chapter-content">
  <h1>۲) نظام صوری آکسیوماتیک چیست؟ (خیلی ساده، مرحله‌به‌مرحله)</h1>

  <blockquote>
    <strong>هدف این فصل:</strong> کاری کنیم یک آدم عادی هم بفهمد «نظام صوری» یعنی چه، «آکسیوم/اصول موضوعه» یعنی چه، و چرا جنت‌خواه از این زبان استفاده می‌کند.
  </blockquote>

  <h2>۱) اول از همه: معنی واژه‌ها (معادل فارسی دقیق)</h2>

  <div class="principles-table">
    <table>
      <thead>
        <tr>
          <th>واژه</th>
          <th>معادل(ها)ی فارسی</th>
          <th>توضیح خیلی ساده</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Axiom</strong></td>
          <td>اصل موضوعه / اصل پذیرفته‌شده / گزارهٔ پایه</td>
          <td>یک «قانونِ پایه» که از آن شروع می‌کنیم و فعلاً آن را قبول می‌کنیم تا بقیه چیزها را بسازیم.</td>
        </tr>
        <tr>
          <td><strong>Axiomatic</strong></td>
          <td>آکسیوماتیک / اصول‌موضوعه</td>
          <td>یعنی «بر پایهٔ چند اصل موضوعه ساخته شده».</td>
        </tr>
        <tr>
          <td><strong>Formal</strong></td>
          <td>صوری / نمادین / فرمی</td>
          <td>یعنی با «شکلِ دقیق و قواعد مشخص» کار می‌کند (نه با حدس و سلیقه).</td>
        </tr>
        <tr>
          <td><strong>Formal System</strong></td>
          <td>نظام صوری / نظام نمادین</td>
          <td>یک «کتاب قوانین» + یک «زبان دقیق» + یک «روش نتیجه‌گیری».</td>
        </tr>
        <tr>
          <td><strong>Rule / Inference</strong></td>
          <td>قاعده / قاعدهٔ استنتاج</td>
          <td>قانونی که می‌گوید از چه چیزهایی می‌توان چه نتیجه‌ای گرفت.</td>
        </tr>
        <tr>
          <td><strong>Consistency</strong></td>
          <td>سازگاری / بی‌تناقضی</td>
          <td>یعنی سیستم به جایی نرسد که هم «A درست است» را ثابت کند هم «A نادرست است».</td>
        </tr>
        <tr>
          <td><strong>Completeness</strong></td>
          <td>کامل بودن</td>
          <td>یعنی برای هر گزارهٔ مهمِ داخل سیستم، بتوان یا آن را ثابت کرد یا رد کرد.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>۲) یک مثال کاملاً دم‌دستی: «بازی» (مثل شطرنج)</h2>

  <p>فرض کن می‌خواهی یک بازی بسازی. برای اینکه بازی <strong>عادلانه</strong> و <strong>قابل اجرا</strong> باشد، باید:</p>
  <ul>
    <li><strong>زبان بازی</strong> مشخص باشد: مهره‌ها، خانه‌ها، نوبت‌ها یعنی چه؟</li>
    <li><strong>قانون‌های پایه</strong> مشخص باشد (آکسیوم‌ها): مثلاً «اسب به شکل L حرکت می‌کند».</li>
    <li><strong>قواعد نتیجه‌گیری/داوری</strong> مشخص باشد: اگر کسی حرکت غیرقانونی کرد چه می‌شود؟</li>
  </ul>

  <p>حالا نکته: وقتی قانون‌ها را دقیق و ثابت نوشتی، از همان چند قانون، هزاران وضعیت بازی و استراتژی «درست و قابل بررسی» تولید می‌شود. این همان روحِ «نظام صوری» است: <strong>قانون کم، نتیجه زیاد</strong>.</p>

  <h2>۳) مثال روزمره‌تر: «قانون راهنمایی و رانندگی»</h2>

  <p>قوانین رانندگی هم یک جور «نظام» هستند:</p>
  <ul>
    <li><strong>اصل پایه (مثل آکسیوم):</strong> «چراغ قرمز یعنی توقف».</li>
    <li><strong>قاعده اجرا:</strong> پلیس/دوربین بررسی می‌کند.</li>
    <li><strong>نتیجه:</strong> پیش‌بینی‌پذیری و کاهش تصادف.</li>
  </ul>

  <blockquote>
    اگر قوانین رانندگی هر روز با سلیقهٔ یک نفر عوض شود، جامعه وارد آشوب می‌شود. «ثباتِ قواعد» یعنی امکان زندگی امن.
  </blockquote>

  <h2>۴) حالا وارد ریاضی می‌شویم: چرا ریاضی بهترین مثال است؟</h2>

  <p>ریاضی دقیقاً برای همین ساخته شده: یک زبان دقیق + چند اصل پایه + قواعد استنتاج. دو مثال معروف:</p>

  <h3>۴-۱) هندسه اقلیدسی (Euclid)</h3>
  <p>در هندسه مدرسه (اقلیدسی)، از چند اصل ساده شروع می‌کنیم. مثال ساده:</p>
  <ul>
    <li><strong>اصل:</strong> از دو نقطه فقط یک خط راست می‌گذرد.</li>
  </ul>
  <p>از همین‌ها، کم‌کم به قضیه‌ها می‌رسی (مساحت مثلث، فیثاغورس، ...). یعنی <strong>با قواعد ثابت، دنیا قابل محاسبه می‌شود</strong>.</p>

  <h3>۴-۲) اعداد طبیعی و آکسیوم‌های پئانو (Peano)</h3>
  <p>سؤال عجیب ولی مهم: «چطور مطمئن می‌شویم ۲+۲=۴؟» در ریاضی، جواب این است: از اصول پایه‌تر. پئانو می‌گوید:</p>
  <ul>
    <li><strong>۰ یک عدد طبیعی است.</strong></li>
    <li><strong>هر عدد، یک جانشین دارد</strong> (۰→۱، ۱→۲، ...).</li>
    <li><strong>دو عدد مختلف، جانشین یکسان ندارند.</strong></li>
    <li><strong>اصل استقرا:</strong> اگر چیزی برای ۰ درست باشد و برای «جانشینِ هر عدد» هم درست بماند، برای همه درست است.</li>
  </ul>

  <blockquote>
    این یعنی ریاضی هم «با چند اصل» شروع می‌کند. اختلاف ریاضی‌دان‌ها معمولاً بر سرِ همین اصول پایه و تعریف‌هاست، نه روی نتیجه‌ها.
  </blockquote>

  <h2>۵) نظام صوری دقیقاً چه اجزایی دارد؟ (یک چک‌لیست روشن)</h2>

  <ol>
    <li><strong>زبان/نمادها:</strong> مثل حروف و علامت‌ها (در ریاضی: +، =، ∀، ...)</li>
    <li><strong>آکسیوم‌ها (اصول موضوعه):</strong> چند جمله/قانون پایه که پذیرفته می‌شوند.</li>
    <li><strong>قواعد استنتاج:</strong> مثل «اگر A و (A→B) را داری، پس B» (این یکی از مشهورترین‌هاست).</li>
    <li><strong>قضیه‌ها:</strong> چیزهایی که از اصول با قواعد استنتاج «اثبات» می‌شوند.</li>
  </ol>

  <h2>۶) قضایای ناتمامیت گودل چیست؟ (خیلی واضح، قدم‌به‌قدم)</h2>

  <p>کرت گودل (Gödel) در سال ۱۹۳۱ دو قضیه خیلی مهم را درباره <strong>نظام‌های صوری آکسیوماتیک</strong> اثبات کرد؛ همان نوع سیستمی که در ریاضی و منطق می‌بینیم.</p>

  <blockquote>
    <strong>یادآوری سریع:</strong> نظام صوری آکسیوماتیک یعنی یک سیستم منطقی که از چند <strong>اصل موضوعه</strong> شروع می‌کند و با <strong>قواعد مکانیکیِ استنتاج</strong> نتیجه‌های جدید می‌سازد (مثل هندسه یا حسابِ اعداد طبیعی).
  </blockquote>

  <h3>۶-۱) قضیه اول ناتمامیت گودل (Incompleteness #1) — نسخه ساده برای همه</h3>
  <p>اگر یک نظام صوری آکسیوماتیک:</p>
  <ul>
    <li><strong>به اندازه کافی قوی</strong> باشد (حداقل بتواند حسابِ ساده اعداد طبیعی را پوشش بدهد)،</li>
    <li>و <strong>سازگار/بی‌تناقض</strong> باشد،</li>
  </ul>
  <p>آن‌وقت همیشه گزاره‌هایی وجود دارند که:</p>
  <ul>
    <li><strong>درست هستند</strong> (از نظر واقعیتِ ریاضی/منطقی)،</li>
    <li>اما <strong>داخل همان سیستم قابل اثبات نیستند</strong>.</li>
  </ul>

  <h4>مثال شهودیِ مشهور (بدون وارد شدن به فرمول‌ها)</h4>
  <p>گودل یک جمله‌ی خاص می‌سازد که معنایش شبیه این است:</p>
  <blockquote>
    «این جمله در این سیستم قابل اثبات نیست.»
  </blockquote>
  <p>اگر سیستم بتواند این جمله را ثابت کند، تناقض پیش می‌آید. اگر نتواند ثابت کند، آن جمله «درست» می‌شود ولی سیستم نمی‌تواند آن را ثابت کند. نتیجه: سیستم <strong>ناتمام</strong> است.</p>

  <h3>۶-۲) قضیه دوم ناتمامیت گودل (Incompleteness #2) — نسخه ساده</h3>
  <p>در همان شرایط، آن سیستم معمولاً نمی‌تواند <strong>سازگاری خودش</strong> را با ابزارهای درونی خودش ثابت کند.</p>
  <blockquote>
    ترجمهٔ خیلی خودمانی: برای اینکه مطمئن شوی «این کتاب قانون خودش خراب نیست»، معمولاً باید یک قدم بیرون‌تر بایستی و از بیرون بررسی کنی.
  </blockquote>

  <h3>۶-۳) جمع‌بندی گودل در یک جمله</h3>
  <blockquote>
    هیچ سیستم منطقیِ خیلی قوی، هم‌زمان «کاملِ صددرصد» و «بی‌تناقضِ تضمین‌شده از داخل خودش» نیست.
  </blockquote>

  <h2>۷) نظریه جنت‌خواه را اینجا چطور بفهمیم؟ (یادآوری سریع)</h2>
  <p>در چارچوبی که خودِ جنت‌خواه می‌چیند:</p>
  <ul>
    <li><strong>اصول پنج‌گانه</strong> (توحید، نبوت، معاد، عدل، امامت/مهدویت) مثل «آکسیوم‌ها» دیده می‌شوند.</li>
    <li>از این اصول، یک شبکه از نتایج اخلاقی/حقوقی/اجتماعی استخراج می‌شود.</li>
    <li>هدف نهاییِ این شبکه: حفاظت از <strong>حقوق مالکیت مطلق</strong> (جسم، ذهن، زمان، دارایی) به عنوان تعریفِ «آزادی واقعی».</li>
  </ul>

  <h2>۸) ارتباط گودل و نظریه جنت‌خواه چیست؟ (واضح و شفاف)</h2>

  <p>این قسمت برای خواننده معمولی خیلی مهم است: گودل درباره «محدودیتِ سیستم‌های صوریِ قوی» حرف می‌زند، و جنت‌خواه هم از زبان «نظام صوری آکسیوماتیک» برای توضیح دین استفاده می‌کند. پس یک اتصال مفهومی طبیعی شکل می‌گیرد.</p>

  <h3>۸-۱) ارتباط مفهومی (بدون دعوا)</h3>
  <ul>
    <li>گودل می‌گوید: سیستم‌های صوریِ قوی، محدودیت دارند.</li>
    <li>جنت‌خواه می‌گوید: دین را می‌توان مثل یک نظام اصول‌محورِ پایدار دید.</li>
    <li>پس یک سؤال جدی ایجاد می‌شود: <strong>اگر دین را «مثل یک نظام صوریِ قوی» ببینیم، آیا محدودیت‌های گودل درباره‌اش مطرح می‌شود؟</strong></li>
  </ul>

  <h3>۸-۲) چالش احتمالی (نقد منطقی رایج)</h3>
  <p>برخی منتقدان می‌گویند:</p>
  <ul>
    <li>اگر دین واقعاً «صوری/نمادین» و «به‌قدر کافی قوی» باشد، طبق گودل باید «ناتمام» باشد.</li>
    <li>پس ادعای «کامل بودن به معنای منطقیِ صددرصد» ممکن است نیاز به دقت و بازتعریف داشته باشد.</li>
  </ul>

  <h3>۸-۳) پاسخ‌های احتمالی (که طرفداران معمولاً مطرح می‌کنند)</h3>
  <p>طرفداران ممکن است بگویند یکی از این‌ها درست‌تر است:</p>
  <ul>
    <li><strong>دین، نظام صوریِ مکانیکی مثل ریاضی نیست</strong>؛ بنابراین دقیقاً زیر چتر قضایای گودل قرار نمی‌گیرد.</li>
    <li><strong>منظور از «کامل» در این نظریه، «کامل برای هدف آزادی» است</strong> نه «کامل بودن منطقیِ گودلی».</li>
    <li><strong>اصول دین بیشتر نقش «آکسیوم‌های ارزش‌محور» دارند</strong> (برای جهت‌دهی اخلاقی/حقوقی)، نه اینکه جایگزین اثبات‌های ریاضی شوند.</li>
  </ul>

  <blockquote>
    <strong>نتیجه عملی برای خواننده:</strong> اینجا یک بحث فلسفیِ مهم داریم: «کامل بودن» دقیقاً یعنی چه؟ کامل برای چه هدفی؟ و دین را دقیقاً در چه سطحی «صوری» می‌نامیم؟
  </blockquote>

  <h2>۹) جدول اصول دین (با مثال واقعی و قابل لمس برای مردم)</h2>

  <div class="principles-table">
    <table>
      <thead>
        <tr>
          <th>اصل دین</th>
          <th>در یک جمله ساده</th>
          <th>اثر روی آزادی (به زبان روزمره)</th>
          <th>یک مثال خیلی واقعی</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>توحید</strong></td>
          <td>مالک مطلق خداست؛ هیچ انسانی «خدا» نیست</td>
          <td>هیچ دولت/رهبر حق ندارد خودش را صاحب جان و مال مردم بداند</td>
          <td>اگر دولت گفت «تو مال منی»، توحید می‌گوید «نه»</td>
        </tr>
        <tr>
          <td><strong>عدل</strong></td>
          <td>تعدی ممنوع</td>
          <td>حق نداری به جسم/ذهن/زمان/دارایی دیگری دست بزنی</td>
          <td>تورمِ عمدی یعنی دست‌بردن به دارایی مردم</td>
        </tr>
        <tr>
          <td><strong>معاد</strong></td>
          <td>پاسخ‌گویی نهایی وجود دارد</td>
          <td>ظلم «بی‌هزینه» نیست؛ قدرت مطلقه بی‌پاسخ نمی‌ماند</td>
          <td>وقتی دادگاه زمینی فاسد شد، ایده پاسخ‌گویی نهایی مهارگر ظلم است</td>
        </tr>
        <tr>
          <td><strong>نبوت</strong></td>
          <td>الگوی عملیِ زندگی عادلانه</td>
          <td>دین فقط تئوری نیست؛ مدل اجرایی دارد</td>
          <td>نمونه‌های تاریخیِ مقاومت در برابر طاغوت</td>
        </tr>
        <tr>
          <td><strong>امامت/مهدویت</strong></td>
          <td>هدف نهایی: جامعه عادل، نه جامعه ترس</td>
          <td>جامعه منتظر، به «حداقل کردن اجبار» حساس می‌شود</td>
          <td>هر جا اجبار بزرگ شد، این اصل می‌پرسد: «آیا داریم به سمت عدالت می‌رویم؟»</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>۱۰) جمع‌بندی خیلی کوتاه (برای اینکه در ذهن بماند)</h2>

  <ul>
    <li><strong>آکسیوم</strong> یعنی «قانون پایه».</li>
    <li><strong>نظام صوری</strong> یعنی «قانون‌نامه دقیق + روش نتیجه‌گیری».</li>
    <li><strong>ریاضی</strong> بهترین مثال است چون کاملاً شفاف است.</li>
    <li><strong>گودل</strong> می‌گوید: سیستم‌های قوی، محدودیت دارند (همه چیز داخل خودش تمام نمی‌شود).</li>
  </ul>

  <blockquote>
    <strong>اگر می‌خواهیم دقیقاً نقل‌قولِ خودِ جنت‌خواه درباره گودل را کلمه‌به‌کلمه بیاوریم:</strong>
    تایم‌استمپ یا متن دقیق همان بخش لازم است تا نقل‌قول کاملاً درست و بدون خطا ثبت شود.
  </blockquote>
</div>
`,

    3: `
<div class="chapter-content">
  <h2>دین، نگهبان واقعی آزادی</h2>
  
  <p>در نگاه جنت‌خواه، دین بزرگ‌ترین دشمن دولت‌سالاری است. اصول دین، دیوارهای دفاعی اطراف حقوق مالکیت انسان‌اند.</p>

  <h3>چگونه دین از آزادی محافظت می‌کند؟</h3>
  
  <ul>
    <li><strong>توحید</strong> دولت را از خدا شدن بازمی‌دارد</li>
    <li><strong>معاد</strong> ظالم را از ابدی بودن می‌ترساند</li>
    <li><strong>مهدویت</strong> جامعه را به سوی آرمان‌شهری بدون اجبار سوق می‌دهد</li>
  </ul>

  <blockquote>
    «دین نیامده تا انسان را ببندد — دین آمده تا انسان را از بند دولت‌ها، قدرت‌ها و هوس‌ها رها کند.»
  </blockquote>

  <h3>تفکیک دین و علم</h3>
  
  <p>دین و علم را جدا می‌کند: علم برای جهان مادی، دین برای حفظ آزادی. مخلوط کردن‌شان، عرفان کاذب یا شبه‌علم می‌آورد.</p>

  <p><strong>نتیجه؟</strong> جامعه‌ای که در آن انسان واقعاً آزاد است — نه تحت سلطه دولت، نه ایدئولوژی، نه اقتصاد ظالم.</p>
</div>
`,

    4: `
<div class="chapter-content">
  <h2>کاربرد در ایران معاصر</h2>
  
  <p>ایران امروز، قربانی دولت‌سالاری است — اما ایران فردا، می‌تواند الگوی آزادی واقعی باشد.</p>

  <h3>مشکلات کنونی</h3>
  
  <ul>
    <li><strong>تورم</strong> = دزدی از مالکیت دارایی</li>
    <li><strong>سانسور</strong> = دزدی از مالکیت ذهن</li>
    <li><strong>اجبارها</strong> = دزدی از مالکیت جسم و زمان</li>
  </ul>

  <h3>راه‌حل جنت‌خواه</h3>
  
  <p>تغییر گفتمان به "دین واقعی = آزادی". جامعه منتظر مهدی، جامعه‌ای است که منتظر آزادی کامل است — نه دولت بزرگ، بلکه حقوق مالکیت مقدس.</p>

  <blockquote>
    «این نظریه، امید واقعی برای ایران است: جامعه‌ای مرفه، آزاد، بدون تورم، بدون سرکوب — جایی که انسان، واقعاً انسان است.»
  </blockquote>
</div>
`,

    10: `<h1>آزادی در عصر هوش مصنوعی: دین به عنوان کد اخلاقی</h1>

<p>در عصر هوش مصنوعی، سوال اساسی این است: چگونه می‌توانیم AI را طوری برنامه‌ریزی کنیم که عادل باشد و حقوق مالکیت انسان را نقض نکند؟ جنت‌خواه پاسخ جالبی دارد: <strong>دین به عنوان کد اخلاقی برای ماشین</strong>.</p>

<h2>مشکل هوش مصنوعی امروز</h2>

<p>هوش مصنوعی امروز با مشکلات جدی روبرو است:</p>

<ul>
<li><strong>نبود چارچوب اخلاقی پایدار:</strong> AI بدون اصول اخلاقی ثابت، می‌تواند به ابزار ظلم تبدیل شود</li>
<li><strong>وابستگی به برنامه‌نویسان:</strong> ارزش‌های برنامه‌نویسان می‌تواند در AI نفوذ کند</li>
<li><strong>نبود مکانیزم دفاع از حقوق مالکیت:</strong> AI ممکن است حریم خصوصی و حقوق مالکیت را نقض کند</li>
</ul>

<h2>راه‌حل: ترجمه دین به کد</h2>

<p>جنت‌خواه می‌گوید: <strong>اصول پنج‌گانه دین (توحید، نبوت، معاد، عدل، امامت) را می‌توان به قوانین منطقی برای AI تبدیل کرد</strong>.</p>

<blockquote>
«اگر می‌خواهیم AI عادل و غیرظالم داشته باشیم، باید اصول دین را به زبان ماشین ترجمه کنیم — این تنها راه برای تضمین آزادی در عصر هوش مصنوعی است.»
</blockquote>

<h3>مثال عملی: چگونه دین به کد تبدیل می‌شود</h3>

<table>
<thead>
<tr>
<th>اصل دین</th>
<th>ترجمه به کد AI</th>
<th>نتیجه</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>توحید</strong></td>
<td>هیچ موجودی (حتی AI) نمی‌تواند خود را مالک انسان بداند</td>
<td>AI نمی‌تواند دستورات ظالمانه بدهد</td>
</tr>
<tr>
<td><strong>عدل</strong></td>
<td>AI نمی‌تواند حقوق مالکیت (جسم، ذهن، زمان، دارایی) را نقض کند</td>
<td>AI محافظ حریم خصوصی و حقوق مالکیت است</td>
</tr>
<tr>
<td><strong>معاد</strong></td>
<td>هر عمل AI باید قابل ردیابی و پاسخگو باشد</td>
<td>شفافیت کامل در تصمیم‌گیری AI</td>
</tr>
<tr>
<td><strong>نبوت</strong></td>
<td>AI باید از الگوهای عادلانه پیروی کند (مثل رفتار پیامبران)</td>
<td>AI بر اساس اخلاق الهی عمل می‌کند</td>
</tr>
<tr>
<td><strong>امامت</strong></td>
<td>AI در انتظار جامعه عادلانه عمل می‌کند، نه جامعه ظالم</td>
<td>AI برای آزادی و عدالت کار می‌کند</td>
</tr>
</tbody>
</table>

<h2>آینده: AI عادل بر پایه دین</h2>

<p>اگر این نظریه را به کار ببریم:</p>

<ul>
<li>✅ AI هرگز نمی‌تواند دستورات ظالمانه بدهد</li>
<li>✅ AI حریم خصوصی را محافظت می‌کند</li>
<li>✅ AI برای آزادی انسان کار می‌کند، نه علیه آن</li>
<li>✅ AI قابل اعتماد و پیش‌بینی‌پذیر است</li>
</ul>

<h2>نتیجه‌گیری</h2>

<p>در عصر هوش مصنوعی، نظریه جنت‌خواه راهنمای ما برای ساخت AI عادل است. دین به عنوان کد اخلاقی می‌تواند آزادی را در آینده تضمین کند.</p>

<blockquote>
«هوش مصنوعی می‌تواند بزرگ‌ترین تهدید یا بزرگ‌ترین فرصت برای آزادی باشد — انتخاب با ماست. با ترجمه اصول دین به کد، می‌توانیم AI عادل و آزادی‌ساز داشته باشیم.»
</blockquote>

<p style="text-align: center; margin-top: 3rem; font-size: 1.25rem; color: #1a5fb4;">
<strong>این فصل نشان می‌دهد که نظریه آزادی جنت‌خواه فقط برای امروز نیست — برای آینده است.</strong>
</p>`,

  },
  en: {
    1: `<div class="chapter-content">
  <h2>What Is Real Freedom?</h2>
  
  <p>Jannatkhah redefines freedom: not Western liberalism with its contradictions, not anarchy with its chaos — but rather <strong>stable and inviolable ownership over four fundamental domains of human existence</strong>.</p>

  <h3>The Four Branches of the Freedom Tree</h3>
  
  <div class="freedom-domains">
    <div class="domain">
      <h4>Ownership of Body</h4>
      <p>No one has the right to coerce, torture, or interfere with your body — from mandatory vaccines to mandatory hijab. Your body is sacred and belongs to you.</p>
    </div>
    
    <div class="domain">
      <h4>Ownership of Mind</h4>
      <p>Freedom of belief, speech, and thought — censorship is the greatest theft in history. Your mind is free to think, believe, and express.</p>
    </div>
    
    <div class="domain">
      <h4>Ownership of Time</h4>
      <p>Your life's time belongs to you — not forced labor, not endless military service. You own the moments of your life.</p>
    </div>
    
    <div class="domain">
      <h4>Ownership of Property</h4>
      <p>The fruit of your labor is sacred — inflation, unjust taxes, and confiscation are theft of freedom. Your property is the result of your own work and effort.</p>
    </div>
  </div>

  <blockquote>
    "This definition transforms freedom from a slogan into a <strong>defensible legal and philosophical principle</strong>. Any political system that violates even one of these four ownerships is anti-freedom — even if it carries the flag of freedom."
  </blockquote>

  <h3>Deep Analysis</h3>
  
  <p>This is what humanity has been searching for for centuries: free will, without fear of dispossession. This theory transforms freedom from a vague political concept into an inviolable property right.</p>
</div>`,

    2: `
<div class="chapter-content">
  <h1>2) What Is a Formal Axiomatic System? (Very Simple, Step-by-Step)</h1>

  <blockquote>
    <strong>Goal of this chapter:</strong> Make an ordinary person understand what a "formal system" means, what an "axiom/fundamental principle" means, and why Jannatkhah uses this language.
  </blockquote>

  <h2>1) First of All: The Meaning of Words (Exact Persian Equivalents)</h2>

  <div class="principles-table">
    <table>
      <thead>
        <tr>
          <th>Term</th>
          <th>Persian Equivalent(s)</th>
          <th>Very Simple Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Axiom</strong></td>
          <td>Fundamental principle / Accepted principle / Base proposition</td>
          <td>A "basic law" that we start with and accept for now to build everything else.</td>
        </tr>
        <tr>
          <td><strong>Axiomatic</strong></td>
          <td>Axiomatic / Based on fundamental principles</td>
          <td>Meaning "built on several fundamental principles."</td>
        </tr>
        <tr>
          <td><strong>Formal</strong></td>
          <td>Formal / Symbolic / Structured</td>
          <td>Works with "precise form and specific rules" (not with guesswork or personal preference).</td>
        </tr>
        <tr>
          <td><strong>Formal System</strong></td>
          <td>Formal system / Symbolic system</td>
          <td>A "rulebook" + a "precise language" + a "method of inference."</td>
        </tr>
        <tr>
          <td><strong>Rule / Inference</strong></td>
          <td>Rule / Inference rule</td>
          <td>A law that says from what things you can derive what conclusion.</td>
        </tr>
        <tr>
          <td><strong>Consistency</strong></td>
          <td>Consistency / Non-contradiction</td>
          <td>Meaning the system does not reach a point where it proves both "A is true" and "A is false."</td>
        </tr>
        <tr>
          <td><strong>Completeness</strong></td>
          <td>Completeness</td>
          <td>Meaning for every important proposition within the system, you can either prove it or refute it.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>2) A Completely Everyday Example: "Games" (Like Chess)</h2>

  <p>Suppose you want to create a game. For the game to be <strong>fair</strong> and <strong>playable</strong>, you must have:</p>
  <ul>
    <li><strong>Game language</strong> clearly defined: What do pieces, squares, turns mean?</li>
    <li><strong>Basic rules</strong> clearly defined (axioms): For example, "A knight moves in an L-shape."</li>
    <li><strong>Inference/judgment rules</strong> clearly defined: What happens if someone makes an illegal move?</li>
  </ul>

  <p>Now the key point: When you write the rules precisely and fixed, from those same few rules, thousands of game situations and strategies "correct and verifiable" are generated. This is the spirit of a "formal system": <strong>few rules, many results</strong>.</p>

  <h2>3) A More Everyday Example: "Traffic Laws"</h2>

  <p>Traffic laws are also a kind of "system":</p>
  <ul>
    <li><strong>Basic principle (like an axiom):</strong> "Red light means stop."</li>
    <li><strong>Enforcement rule:</strong> Police/cameras check.</li>
    <li><strong>Result:</strong> Predictability and reduced accidents.</li>
  </ul>

  <blockquote>
    If traffic laws changed every day based on one person's preference, society would fall into chaos. "Stability of rules" means the possibility of secure life.
  </blockquote>

  <h2>4) Now We Enter Mathematics: Why Is Math the Best Example?</h2>

  <p>Mathematics was built exactly for this: a precise language + a few basic principles + inference rules. Two famous examples:</p>

  <h3>4-1) Euclidean Geometry</h3>
  <p>In school geometry (Euclidean), we start from a few simple principles. A simple example:</p>
  <ul>
    <li><strong>Principle:</strong> Through two points, only one straight line passes.</li>
  </ul>
  <p>From these, gradually you reach theorems (triangle area, Pythagoras, ...). This means <strong>with fixed rules, the world becomes calculable</strong>.</p>

  <h3>4-2) Natural Numbers and Peano Axioms</h3>
  <p>A strange but important question: "How do we know that 2+2=4?" In mathematics, the answer is: from more basic principles. Peano says:</p>
  <ul>
    <li><strong>0 is a natural number.</strong></li>
    <li><strong>Every number has a successor</strong> (0→1, 1→2, ...).</li>
    <li><strong>Two different numbers do not have the same successor.</strong></li>
    <li><strong>Induction principle:</strong> If something is true for 0 and remains true for "the successor of any number," then it is true for all.</li>
  </ul>

  <blockquote>
    This means mathematics also "starts with a few principles." Disagreements among mathematicians are usually about these basic principles and definitions, not about results.
  </blockquote>

  <h2>5) What Components Does a Formal System Exactly Have? (A Clear Checklist)</h2>

  <ol>
    <li><strong>Language/Symbols:</strong> Like letters and signs (in math: +, =, ∀, ...)</li>
    <li><strong>Axioms (Fundamental Principles):</strong> A few base sentences/rules that are accepted.</li>
    <li><strong>Inference Rules:</strong> Like "If you have A and (A→B), then B" (this is one of the most famous).</li>
    <li><strong>Theorems:</strong> Things that are "proven" from principles using inference rules.</li>
  </ol>

  <h2>6) What Are Gödel's Incompleteness Theorems? (Very Clear, Step-by-Step)</h2>

  <p>Kurt Gödel in 1931 proved two very important theorems about <strong>formal axiomatic systems</strong>; the same type of system we see in mathematics and logic.</p>

  <blockquote>
    <strong>Quick Reminder:</strong> A formal axiomatic system means a logical system that starts from a few <strong>fundamental principles</strong> and builds new results using <strong>mechanical inference rules</strong> (like geometry or arithmetic of natural numbers).
  </blockquote>

  <h3>6-1) Gödel's First Incompleteness Theorem — Simple Version for Everyone</h3>
  <p>If a formal axiomatic system:</p>
  <ul>
    <li>Is <strong>strong enough</strong> (at least can cover simple arithmetic of natural numbers),</li>
    <li>And is <strong>consistent/non-contradictory</strong>,</li>
  </ul>
  <p>Then there are always propositions that:</p>
  <ul>
    <li>Are <strong>true</strong> (from the perspective of mathematical/logical reality),</li>
    <li>But are <strong>not provable within that same system</strong>.</li>
  </ul>

  <h4>Famous Intuitive Example (Without Getting into Formulas)</h4>
  <p>Gödel constructs a special sentence whose meaning is something like:</p>
  <blockquote>
    "This sentence is not provable in this system."
  </blockquote>
  <p>If the system can prove this sentence, a contradiction arises. If it cannot prove it, that sentence becomes "true" but the system cannot prove it. Result: The system is <strong>incomplete</strong>.</p>

  <h3>6-2) Gödel's Second Incompleteness Theorem — Simple Version</h3>
  <p>Under the same conditions, that system usually cannot prove <strong>its own consistency</strong> using its internal tools.</p>
  <blockquote>
    Very informal translation: To be sure that "this rulebook is not broken itself," you usually need to step one step outside and examine it from outside.
  </blockquote>

  <h3>6-3) Summary of Gödel in One Sentence</h3>
  <blockquote>
    No very strong logical system is simultaneously "100% complete" and "guaranteed non-contradictory from within itself."
  </blockquote>

  <h2>7) How Do We Understand Jannatkhah's Theory Here? (Quick Reminder)</h2>
  <p>In the framework that Jannatkhah himself sets:</p>
  <ul>
    <li>The <strong>five principles</strong> (Tawhid, Prophethood, Resurrection, Justice, Imamate/Mahdism) are seen as "axioms."</li>
    <li>From these principles, a network of ethical/legal/social results is extracted.</li>
    <li>The ultimate goal of this network: protecting <strong>absolute property rights</strong> (body, mind, time, property) as the definition of "real freedom."</li>
  </ul>

  <h2>8) What Is the Connection Between Gödel and Jannatkhah's Theory? (Clear and Transparent)</h2>

  <p>This section is very important for the ordinary reader: Gödel talks about "limitations of strong formal systems," and Jannatkhah also uses the language of "formal axiomatic system" to explain religion. So a natural conceptual connection is formed.</p>

  <h3>8-1) Conceptual Connection (Without Dispute)</h3>
  <ul>
    <li>Gödel says: Strong formal systems have limitations.</li>
    <li>Jannatkhah says: Religion can be seen as a stable principle-based system.</li>
    <li>So a serious question arises: <strong>If we see religion "like a strong formal system," do Gödel's limitations apply to it?</strong></li>
  </ul>

  <h3>8-2) Potential Challenge (Common Logical Criticism)</h3>
  <p>Some critics say:</p>
  <ul>
    <li>If religion is truly "formal/symbolic" and "strong enough," according to Gödel it must be "incomplete."</li>
    <li>So the claim of "completeness in the logical sense of 100%" may need precision and redefinition.</li>
  </ul>

  <h3>8-3) Possible Responses (That Supporters Usually Present)</h3>
  <p>Supporters may say one of these is more correct:</p>
  <ul>
    <li><strong>Religion is not a mechanical formal system like mathematics</strong>; therefore it does not fall exactly under Gödel's theorems.</li>
    <li><strong>The meaning of "complete" in this theory is "complete for the goal of freedom"</strong> not "Gödelian logical completeness."</li>
    <li><strong>Religious principles have more the role of "value-based axioms"</strong> (for ethical/legal direction), not that they replace mathematical proofs.</li>
  </ul>

  <blockquote>
    <strong>Practical Result for the Reader:</strong> Here we have an important philosophical discussion: What exactly does "completeness" mean? Complete for what purpose? And at what level do we exactly call religion "formal"?
  </blockquote>

  <h2>9) Table of Religious Principles (With Real and Tangible Examples for People)</h2>

  <div class="principles-table">
    <table>
      <thead>
        <tr>
          <th>Religious Principle</th>
          <th>In One Simple Sentence</th>
          <th>Effect on Freedom (In Everyday Language)</th>
          <th>A Very Real Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Tawhid (Monotheism)</strong></td>
          <td>The absolute owner is God; no human is "God"</td>
          <td>No state/leader has the right to consider themselves owner of people's lives and property</td>
          <td>If the state says "You belong to me," Tawhid says "No"</td>
        </tr>
        <tr>
          <td><strong>Adl (Justice)</strong></td>
          <td>Aggression is forbidden</td>
          <td>You have no right to touch another's body/mind/time/property</td>
          <td>Intentional inflation means touching people's property</td>
        </tr>
        <tr>
          <td><strong>Ma'ad (Resurrection)</strong></td>
          <td>Final accountability exists</td>
          <td>Oppression is not "cost-free"; absolute power does not remain unanswered</td>
          <td>When earthly courts become corrupt, the idea of final accountability restrains oppression</td>
        </tr>
        <tr>
          <td><strong>Nubuwwah (Prophethood)</strong></td>
          <td>Practical model of just life</td>
          <td>Religion is not just theory; it has an implementation model</td>
          <td>Historical examples of resistance against tyranny</td>
        </tr>
        <tr>
          <td><strong>Imamate/Mahdism</strong></td>
          <td>Ultimate goal: just society, not a society of fear</td>
          <td>The awaiting society becomes sensitive to "minimizing coercion"</td>
          <td>Wherever coercion grows large, this principle asks: "Are we moving toward justice?"</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>10) Very Brief Summary (To Remember)</h2>

  <ul>
    <li><strong>Axiom</strong> means "basic law."</li>
    <li><strong>Formal system</strong> means "precise rulebook + inference method."</li>
    <li><strong>Mathematics</strong> is the best example because it is completely transparent.</li>
    <li><strong>Gödel</strong> says: Strong systems have limitations (not everything is completed within itself).</li>
  </ul>

  <blockquote>
    <strong>If we want to bring Jannatkhah's exact quote about Gödel word-for-word:</strong>
    A timestamp or exact text of that section is needed so the quote is recorded completely correctly and without error.
  </blockquote>
</div>
`,

    3: `
<div class="chapter-content">
  <h2>Religion, the True Guardian of Freedom</h2>
  
  <p>In Jannatkhah's view, religion is the greatest enemy of statism. Religious principles are defensive walls around human property rights.</p>

  <h3>How Does Religion Protect Freedom?</h3>
  
  <ul>
    <li><strong>Tawhid (Monotheism)</strong> prevents the state from becoming God</li>
    <li><strong>Ma'ad (Resurrection)</strong> terrifies oppressors with the impossibility of eternal existence</li>
    <li><strong>Mahdism</strong> directs society toward an ideal without coercion</li>
  </ul>

  <blockquote>
    "Religion did not come to bind humanity — religion came to free humanity from the bonds of governments, powers, and desires."
  </blockquote>

  <h3>Separation of Religion and Science</h3>
  
  <p>It separates religion and science: science for the material world, religion for preserving freedom. Mixing them brings false mysticism or pseudo-science.</p>

  <p><strong>The Result?</strong> A society where humans are truly free — not under the domination of the state, not ideology, not oppressive economics.</p>
</div>
`,

    4: `
<div class="chapter-content">
  <h2>Application in Contemporary Iran</h2>
  
  <p>Today's Iran is a victim of statism — but tomorrow's Iran can be a model of real freedom.</p>

  <h3>Current Problems</h3>
  
  <ul>
    <li><strong>Inflation</strong> = Theft of property ownership</li>
    <li><strong>Censorship</strong> = Theft of mind ownership</li>
    <li><strong>Coercions</strong> = Theft of body and time ownership</li>
  </ul>

  <h3>Jannatkhah's Solution</h3>
  
  <p>Shifting the discourse to "real religion = freedom." The society awaiting Mahdi is a society that awaits complete freedom — not a big state, but sacred property rights.</p>

  <blockquote>
    "This theory is real hope for Iran: a prosperous, free society, without inflation, without oppression — a place where humans are truly human."
  </blockquote>
</div>
`,

    5: `
<div class="chapter-content">
  <h2>Philosophical Analysis of Freedom</h2>
  
  <p>This chapter provides a deep examination of freedom in both Islamic and Western philosophical traditions, showing how Jannatkhah's theory bridges these traditions.</p>

  <h3>Freedom in Islamic Philosophy</h3>
  
  <p>In Islamic thought, freedom is not merely the absence of constraints, but the positive exercise of will within the framework of divine justice. The concept of <strong>absolute property rights</strong> aligns with Islamic principles of justice and non-aggression.</p>

  <h3>Freedom in Western Philosophy</h3>
  
  <p>From Locke to Rothbard, Western philosophers have grappled with property rights and freedom. Jannatkhah's theory provides a religious foundation for these same principles, showing that religion and liberty are not opposed but complementary.</p>

  <blockquote>
    "True freedom requires both the absence of coercion and the presence of just principles. Religion provides the latter, ensuring that freedom is not merely chaos but ordered liberty."
  </blockquote>

  <h3>The Synthesis</h3>
  
  <p>By grounding freedom in absolute property rights and showing how religious principles protect these rights, Jannatkhah creates a synthesis that transcends both Eastern and Western philosophical traditions.</p>
</div>
`,

    6: `
<div class="chapter-content">
  <h2>Divine Justice and Human Rights</h2>
  
  <p>This chapter explores how the principle of justice in religion connects to absolute property rights and forms the foundation of human rights.</p>

  <h3>Justice as Non-Aggression</h3>
  
  <p>The principle of <strong>Adl (Justice)</strong> in religion means non-aggression: you have no right to violate another's body, mind, time, or property. This is not merely a moral principle but a legal and philosophical foundation.</p>

  <h3>Divine Justice vs. Human Courts</h3>
  
  <p>While human courts may be corrupt or biased, the principle of <strong>Ma'ad (Resurrection)</strong> ensures that ultimate justice will be served. This provides a check on earthly power and a guarantee for the oppressed.</p>

  <blockquote>
    "When earthly courts fail, the idea of divine justice restrains oppression. No tyrant can escape ultimate accountability."
  </blockquote>

  <h3>Property Rights as Human Rights</h3>
  
  <p>By defining freedom as absolute property rights, Jannatkhah shows that human rights are not abstract concepts but concrete, defensible claims. Your body, mind, time, and property are yours by right — not by permission.</p>
</div>
`,

    7: `
<div class="chapter-content">
  <h2>The Awaiting Society and Freedom</h2>
  
  <p>This chapter examines the role of Imamate and Mahdism in creating a free society — not through waiting passively, but through active resistance to coercion.</p>

  <h3>The Concept of the Awaiting Society</h3>
  
  <p>The society that awaits the Mahdi is not a passive, submissive society. It is a society that actively resists oppression and works toward justice. This resistance is itself a form of freedom.</p>

  <h3>Imamate as a Model</h3>
  
  <p>The Imams provide models of resistance against tyranny. They show that true religion opposes statism and defends human freedom. Their example guides the awaiting society.</p>

  <blockquote>
    "The awaiting society is not waiting for a savior to do everything — it is waiting while actively working for freedom and justice."
  </blockquote>

  <h3>Minimizing Coercion</h3>
  
  <p>The goal of the awaiting society is to minimize coercion in all its forms: economic (inflation, unjust taxes), political (oppression, censorship), and social (forced conformity).</p>
</div>
`,

    8: `
<div class="chapter-content">
  <h2>Freedom in the Modern World</h2>
  
  <p>This chapter applies Jannatkhah's theory to the challenges of the digital age and globalization, showing how property rights must be defended in new contexts.</p>

  <h3>Digital Age Challenges</h3>
  
  <p>In the digital age, property rights face new threats:</p>
  <ul>
    <li><strong>Data ownership:</strong> Who owns your personal data?</li>
    <li><strong>Intellectual property:</strong> How are ideas and creations protected?</li>
    <li><strong>Privacy:</strong> How is mind ownership protected online?</li>
  </ul>

  <h3>Globalization and Freedom</h3>
  
  <p>Globalization can either enhance or threaten freedom. When it respects property rights, it enables prosperity. When it violates them (through international coercion, currency manipulation, etc.), it becomes a tool of oppression.</p>

  <blockquote>
    "The principles of freedom are timeless, but their application must adapt to new contexts. Digital rights are property rights, and they must be defended with the same vigor as physical property."
  </blockquote>

  <h3>Defending Freedom in a Connected World</h3>
  
  <p>In a globally connected world, defending freedom requires understanding how property rights apply to digital assets, international trade, and cross-border interactions. The same principles apply: non-aggression, absolute ownership, and divine justice.</p>
</div>
`,

    9: `
<div class="chapter-content">
  <h2>The Future of Freedom</h2>
  
  <p>This chapter presents a forward-looking vision of freedom grounded in durable principles, showing how Jannatkhah's theory provides a path forward for humanity.</p>

  <h3>A Vision Grounded in Principles</h3>
  
  <p>The future of freedom is not about utopian dreams but about applying timeless principles to new challenges. By grounding freedom in absolute property rights and religious principles, we create a foundation that can withstand the test of time.</p>

  <h3>Challenges Ahead</h3>
  
  <p>Future challenges to freedom will take new forms:</p>
  <ul>
    <li>Technological surveillance and control</li>
    <li>Economic manipulation through digital currencies</li>
    <li>Ideological coercion through social media</li>
  </ul>

  <blockquote>
    "The enemies of freedom are always the same: those who seek to violate property rights. The methods change, but the principle remains: defend absolute ownership, and freedom will endure."
  </blockquote>

  <h3>The Path Forward</h3>
  
  <p>The path forward requires:</p>
  <ul>
    <li>Understanding freedom as property rights</li>
    <li>Recognizing religion as the guardian of these rights</li>
    <li>Resisting all forms of coercion, old and new</li>
  </ul>

  <p style="text-align: center; margin-top: 3rem; font-size: 1.25rem; color: #1a5fb4;">
    <strong>The future of freedom is in our hands — if we understand what freedom truly means.</strong>
  </p>
</div>
`,

    10: `
<div class="chapter-content">
  <h1>Freedom in the Age of AI: Religion as Ethical Code</h1>

  <p>In the age of artificial intelligence, the fundamental question is: How can we program AI to be just and not violate human property rights? Jannatkhah has an interesting answer: <strong>religion as ethical code for machines</strong>.</p>

  <h2>The Problem with Today's AI</h2>

  <p>Today's AI faces serious problems:</p>

  <ul>
    <li><strong>Lack of stable ethical framework:</strong> AI without fixed ethical principles can become a tool of oppression</li>
    <li><strong>Dependence on programmers:</strong> Programmers' values can influence AI</li>
    <li><strong>Lack of mechanism to defend property rights:</strong> AI may violate privacy and property rights</li>
  </ul>

  <h2>The Solution: Translating Religion into Code</h2>

  <p>Jannatkhah says: <strong>The five principles of religion (Tawhid, Prophethood, Resurrection, Justice, Imamate) can be converted into logical rules for AI</strong>.</p>

  <blockquote>
    "If we want just and non-oppressive AI, we must translate religious principles into machine language — this is the only way to guarantee freedom in the age of artificial intelligence."
  </blockquote>

  <h3>Practical Example: How Religion Becomes Code</h3>

  <table>
    <thead>
      <tr>
        <th>Religious Principle</th>
        <th>Translation to AI Code</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Tawhid</strong></td>
        <td>No being (even AI) can consider itself owner of humans</td>
        <td>AI cannot give oppressive commands</td>
      </tr>
      <tr>
        <td><strong>Adl (Justice)</strong></td>
        <td>AI cannot violate property rights (body, mind, time, property)</td>
        <td>AI protects privacy and property rights</td>
      </tr>
      <tr>
        <td><strong>Ma'ad (Resurrection)</strong></td>
        <td>Every AI action must be traceable and accountable</td>
        <td>Complete transparency in AI decision-making</td>
      </tr>
      <tr>
        <td><strong>Nubuwwah (Prophethood)</strong></td>
        <td>AI must follow just models (like prophets' behavior)</td>
        <td>AI acts based on divine ethics</td>
      </tr>
      <tr>
        <td><strong>Imamate</strong></td>
        <td>AI acts in anticipation of a just society, not an oppressive one</td>
        <td>AI works for freedom and justice</td>
      </tr>
    </tbody>
  </table>

  <h2>The Future: Just AI Based on Religion</h2>

  <p>If we apply this theory:</p>

  <ul>
    <li>✅ AI can never give oppressive commands</li>
    <li>✅ AI protects privacy</li>
    <li>✅ AI works for human freedom, not against it</li>
    <li>✅ AI is trustworthy and predictable</li>
  </ul>

  <h2>Conclusion</h2>

  <p>In the age of artificial intelligence, Jannatkhah's theory is our guide for building just AI. Religion as ethical code can guarantee freedom in the future.</p>

  <blockquote>
    "Artificial intelligence can be the greatest threat or the greatest opportunity for freedom — the choice is ours. By translating religious principles into code, we can have just and freedom-enhancing AI."
  </blockquote>

  <p style="text-align: center; margin-top: 3rem; font-size: 1.25rem; color: #1a5fb4;">
    <strong>This chapter shows that Jannatkhah's freedom theory is not just for today — it is for the future.</strong>
  </p>
</div>
`,

  },
};

/**
 * Get chapter content by number and locale
 * Falls back to 'fa' if locale content not available
 * 
 * @param chapterNumber - Chapter number (1-10)
 * @param locale - Locale ('fa' | 'en')
 * @returns HTML content string or null if not found
 */
export function getChapterContent(chapterNumber: number, locale: Locale): string | null {
  // Try requested locale first
  const content = chapterContent[locale]?.[chapterNumber];
  if (content) {
    return content;
  }
  
  // Fallback to Persian if not found
  if (locale !== 'fa') {
    const fallbackContent = chapterContent.fa?.[chapterNumber];
    if (fallbackContent) {
      return fallbackContent;
    }
  }
  
  return null;
}
