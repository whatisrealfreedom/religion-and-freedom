-- Migration: Add new chapter "ایران: مهد آزادی و حقوق مالکیت" as chapter 5
-- This shifts the current chapter 5 and later chapters forward by one
-- This migration is idempotent - it only runs if the chapter doesn't exist

-- Check if migration already applied (by checking if the Iran chapter exists)
-- If slug 'iran-cradle-of-freedom-property-rights' exists, this migration has already run

-- Step 1: Shift chapters only if migration hasn't run yet
-- We do this by checking if any chapter with number >= 5 has the Iran chapter's slug
-- Since we can't use IF in SQLite easily, we'll use a transaction approach
-- But SQLite migrations run as transactions, so we need a different approach

-- Approach: Use INSERT OR IGNORE which will fail silently if the slug already exists
-- But we still need to handle the UPDATEs. The issue is UPDATEs will run even if chapter exists.

-- Better approach: Check if we need to shift by looking at current state
-- If chapter 5 is NOT the Iran chapter, we need to shift

-- For idempotency, we'll check: if slug doesn't exist, do the migration
-- Since we can't conditionally UPDATE, we'll rely on the fact that:
-- - If slug exists, INSERT OR IGNORE will do nothing
-- - UPDATEs will only cause issues if they run after migration was already applied
-- - Solution: Check the current state before UPDATE

-- Actually, the simplest solution: 
-- Only do UPDATEs if the target chapter (number 5) is NOT the Iran chapter
-- We can't easily check this in pure SQL, so we'll accept that UPDATEs might run
-- but use INSERT OR IGNORE to prevent duplicate inserts

-- Final approach: Use INSERT OR IGNORE for safety, and make UPDATEs safe by checking
-- But SQLite doesn't support conditional UPDATEs easily...

-- BEST SOLUTION: Since migrations run in order, and this is a one-time migration,
-- we can accept that if it runs twice, we need to handle it.
-- The safest way: Only shift if chapter 5 is NOT already the Iran chapter

-- We'll use a pragma to check, but actually the best way is to:
-- 1. First check if we need to migrate (by checking slug)
-- 2. Only if needed, do UPDATEs and INSERT

-- Since SQLite migrations don't support IF statements, we'll use a workaround:
-- Try to insert first (which will fail if exists due to UNIQUE constraint on slug)
-- But that won't help with UPDATEs...

-- SIMPLEST WORKING SOLUTION FOR NOW:
-- Since this is a data migration, we'll make it so it only affects if the data doesn't exist
-- We'll insert OR IGNORE, which will skip if slug exists
-- For UPDATEs, we'll accept that they might shift things unnecessarily if run twice
-- BUT: if slug exists, the UPDATEs might have already been done, so shifting again would be wrong

-- ACTUALLY: The real issue is that when Docker container restarts, it recreates the DB
-- from migrations. So the data we manually inserted is lost.
-- The solution: Make sure the migration is in the seed data migration (002_seed_data.sql)
-- OR: Accept that this migration will run every time and handle it gracefully

-- For now, let's make it so UPDATEs only happen if needed:
-- We'll check if chapter 5's slug is NOT 'iran-cradle-of-freedom-property-rights'
-- If it's not, we shift. But we can't do this in pure SQL easily.

-- WORKAROUND: Use INSERT OR IGNORE, and make UPDATEs conditional by checking COUNT
-- If COUNT of chapters with slug = 'iran-cradle-of-freedom-property-rights' = 0, then migrate

-- Actually, simplest: Just check if the chapter exists at the start
-- If it exists (SELECT COUNT), then don't run UPDATEs
-- But SQLite doesn't support IF...

-- FINAL DECISION: Since this is a migration file that runs once, and the error suggests
-- it's running multiple times, the issue is that the DB is being recreated.
-- The real fix: Either fix the migration to be truly idempotent, or ensure it only runs once.

-- For idempotency, we'll:
-- 1. Check if chapter exists (can't easily skip in SQLite, so we'll use INSERT OR IGNORE)
-- 2. Only shift if we're actually inserting

-- Since we can't conditionally UPDATE in SQLite easily without stored procedures,
-- and INSERT OR IGNORE only helps with the INSERT, we need a different approach.

-- SOLUTION: Remove the UPDATE statements entirely and just INSERT with a specific number
-- But then we'd have a conflict with existing chapter 5...

-- ACTUAL SOLUTION: Since migrations run in order, and this is migration 008,
-- by the time it runs, the DB should be in state from migration 007.
-- The issue is it's running multiple times on the same DB.
-- So we need to make it idempotent.

-- Let's use: INSERT OR IGNORE with a check on slug uniqueness
-- For UPDATEs, we'll make them conditional by using a subquery check

-- Here's the working idempotent version:
-- Only shift if the Iran chapter doesn't exist yet

-- Check if Iran chapter exists
-- If not, shift chapters and insert
-- We'll use a WHERE clause on UPDATEs to only update if Iran chapter doesn't exist

-- Since SQLite doesn't support IF, we'll use this pattern:
-- UPDATE only chapters that need shifting, and INSERT OR IGNORE

-- Actually, let's just make it simple: 
-- If slug 'iran-cradle-of-freedom-property-rights' exists, do nothing (INSERT OR IGNORE handles this)
-- For UPDATEs, we need to check first... but we can't easily.

-- FINAL WORKING SOLUTION:
-- Remove UPDATEs from this migration
-- Instead, assume the data is correct from seed (002_seed_data.sql)
-- OR: Make this migration only run if chapter doesn't exist

-- Let's just use INSERT OR IGNORE and accept UPDATEs might run unnecessarily
-- But add a WHERE clause to UPDATEs to make them safer

-- Actually wait - the error is UNIQUE constraint on chapters.number
-- This means when we UPDATE number 5 to 6, and then try to INSERT number 5,
-- but number 5 already exists (from a previous partial run?).

-- The real issue: Migration runs, UPDATEs shift numbers, INSERT succeeds.
-- Then container restarts, DB is recreated from migrations 1-7,
-- Migration 8 runs again, UPDATEs try to shift again, but now there's a conflict.

-- Solution: Make UPDATEs conditional - only update if Iran chapter doesn't exist
-- We'll check by trying to insert first, and if it succeeds, then we know we need to shift
-- But that won't work because we need to shift BEFORE inserting.

-- BEST SOLUTION: Check at the start if migration needed
-- Use a CTE or subquery to check, then conditionally run
-- But SQLite migrations are just SQL, so we can't use IF

-- WORKING FIX: Use INSERT OR IGNORE for the insert, and for UPDATEs,
-- only update rows that aren't already in their target state
-- We'll UPDATE where number < target_number (so if already shifted, no change)

-- Actually, the simplest fix: Just don't run UPDATEs if Iran chapter exists
-- We can do this by checking in a WHERE clause

-- Let's try this approach:
-- UPDATE chapters SET number = number + 1 WHERE number >= 5 
--   AND NOT EXISTS (SELECT 1 FROM chapters WHERE slug = 'iran-cradle-of-freedom-property-rights')

-- But this won't work because the check is per-row, not global

-- FINAL SIMPLE SOLUTION:
-- Since the error shows it's trying to insert when number 5 already exists,
-- it means a previous run partially completed.
-- The fix: Use INSERT OR REPLACE instead of INSERT, OR
-- Better: Check before INSERT if number 5 exists with different slug, delete it first

-- Actually, simplest: Use INSERT OR IGNORE, which will skip if slug exists
-- And for UPDATEs, add a condition to only update if needed

-- Let me write a clean, working version:

-- Only shift if Iran chapter doesn't exist
-- We'll use a subquery in WHERE to check

UPDATE chapters 
SET number = number + 1, "order" = "order" + 1 
WHERE number >= 5 
  AND number <= 10
  AND NOT EXISTS (
    SELECT 1 FROM chapters WHERE slug = 'iran-cradle-of-freedom-property-rights'
  )
ORDER BY number DESC;

-- Insert the new chapter (will be ignored if slug already exists)
INSERT OR IGNORE INTO chapters (number, title, slug, description, content, icon, pages, read_time, featured, "order") 
SELECT 5, 'ایران: مهد حقوق مالکیت و آزادی واقعی', 'iran-cradle-of-freedom-property-rights', 
       'از اسطوره‌های باستانی تا امروز — چرا ایران، سرزمین دفاع از مالکیت و آزادی است',
       '<div class="chapter-content">
<h1>ایران: مهد آزادی و حقوق مالکیت 🏛️🕊️</h1>

<h2>از اسطوره‌های باستانی تا امروز — چرا ایران، سرزمین دفاع از مالکیت و آزادی واقعی است</h2>

<p><strong>۲۰ دقیقه مطالعه • الهام‌بخش برای هر ایرانی</strong></p>

<h2>مقدمه: ایران در نگاه جنت‌خواه — یک کشف عمیق و زیبا</h2>

<p>محمدعلی جنت‌خواه در سخنرانی‌هایش مفهومی عمیق و زیبا را ارائه می‌دهد: وقتی نظریه <strong>آزادی = حقوق مالکیت مطلق</strong> را فهمیدم، نگاهم به ایران کاملاً تغییر کرد. ایران نه فقط یک کشور جغرافیایی — بلکه <strong>مهد حقوق مالکیت</strong> و دفاع از آزادی انسان است.</p>

<p>این دیدگاه، ریشه در تاریخ، فرهنگ و دین ایرانی دارد — جایی که مردم هزاران سال پیش، پخته‌تر از بسیاری ملت‌ها، دین را به عنوان <strong>ضامن آزادی و مالکیت</strong> پذیرفتند. ایرانیان باستان و پس از اسلام، همیشه در برابر دولت‌سالاری و غارت مالکیت ایستادند. این صفحه، تجلیل از این میراث بزرگ است — میراثی که هر ایرانی باید به آن افتخار کند.</p>

<h2>۱. ریشه نظریه: دین، تنها نظام پایدار برای آزادی</h2>

<p>جنت‌خواه می‌گوید: تمام نظریه‌های آزادی غربی — از جان لاک تا موری روت‌بارد — تناقض دارند. جایی می‌رسند که حقوق مالکیت را نقض می‌کنند. اما دین (اصول شیعه) تنها نظام صوری باثبات تاریخ است که آزادی را <strong>ابدی تضمین می‌کند</strong>.</p>

<blockquote>
<p><strong>این کشف، یک شاهکار فکری است</strong> — چون نشان می‌دهد دین نه برای کنترل، بلکه برای <strong>رهایی انسان</strong> آمده. ایرانیان پخته بودند که این را زودتر فهمیدند: دین ضامن مالکیت جسم، ذهن، زمان و دارایی است. در تاریخ ایران، از زمان پذیرش اسلام، مردم دین را به عنوان <strong>سپر در برابر سلطان‌های غارتگر</strong> دیدند.</p>
</blockquote>

<h2>۲. ایران = مهد حقوق مالکیت</h2>

<p>جنت‌خواه تأکید می‌کند: خاورمیانه و به ویژه ایران، <strong>حافظه تاریخی</strong> دارد که دین ضامن حقوق مالکیت بوده. ایران تنها ملتی است که با تنوع قومی و زبانی عظیم، یک ملت اصیل شده — مثل آمریکا، اما با <strong>هزاران سال سابقه بیشتر</strong>.</p>

<blockquote>
<p>این جمله زیبا، عمق عظیمی دارد: ایرانیان از اقوام مختلف — فارس، ترک، کرد، عرب، بلوچ، لر، ترکمن و... — با فرهنگ‌های غنی و متفاوت، بدون اجبار دولتی، یک <strong>ملت واحد</strong> ساختند. چرا؟ چون مشترکاً به <strong>حقوق مالکیت و آزادی</strong> باور داشتند.</p>

<p>این تنوع، <strong>ثروت ایران</strong> است — نه ضعف. ایرانیان پخته‌تر از بسیاری ملت‌ها بودند که دین را نه به عنوان ابزار قدرت، بلکه <strong>سپر آزادی</strong> پذیرفتند.</p>
</blockquote>

<h2>۳. اسطوره‌های ایرانی: قهرمانان مردمی، نه دولتی</h2>

<p>در اسطوره‌های ما — از شاهنامه تا روایات محلی — قهرمانانی مثل <strong>رستم</strong>، <strong>سیاوش</strong>، <strong>آرش کمانگیر</strong> یا <strong>کاوه آهنگر</strong>، دولتی نبودند. آنها مردمانی داوطلب بودند که از حقوق مالکیت و میهن دفاع می‌کردند.</p>

<blockquote>
<p><strong>رستم</strong> نه پادشاه بود، نه سرباز اجباری — یک انسان آزاد که برای دفاع از مرزها و حقوق مردم قیام کرد. <strong>کاوه آهنگر</strong> یک آهنگر ساده بود که در برابر ظلم ضحاک ایستاد. این نشان می‌دهد فرهنگ ایرانی همیشه <strong>ضد دولت‌سالاری</strong> بوده — قهرمانان ما داوطلب آزادی بودند، نه ابزار قدرت.</p>
</blockquote>

<h2>۴. تعریف جدید ایران: مدافعان حقوق مالکیت</h2>

<p>اگر ایران مجموعه‌ای از <strong>مدافعان حقوق مالکیت</strong> باشد، پس مدافع تنها نظام باثبات آن یعنی دین است — دینی که در ایران (تشیع با ۵ اصل) عمیقاً ریشه دارد و قرن‌هاست که مردم را از ظلم و غارت محافظت کرده است.</p>

<blockquote>
<p>این تعریف، ایران را از یک کشور جغرافیایی به یک <strong>مأموریت مقدس</strong> تبدیل می‌کند: ایرانی یعنی کسی که از مالکیت همدیگر دفاع می‌کند. در فرهنگ ما، <strong>شهید</strong> کسی است که در راه میهن جان داد — چون میهن = سرزمین حقوق مالکیت و آزادی.</p>
</blockquote>

<h2>۵. شعار جنت‌خواه: خدا، آزادی، خانواده و میهن</h2>

<p><strong>«خدا، آزادی، خانواده و میهن»</strong></p>

<ul>
<li><strong>خدا:</strong> تنها موجودی که بندگی‌اش آزادی می‌آورد. توحید = رهایی از بندگی انسان.</li>
<li><strong>آزادی:</strong> حقوق مالکیت مطلق. مالکیت بر جسم، ذهن، زمان و دارایی.</li>
<li><strong>خانواده:</strong> کوچک‌ترین نهاد خصوصی که از فرد در برابر دولت دفاع می‌کند.</li>
<li><strong>میهن:</strong> سرزمین مشترک دفاع از این حقوق.</li>
</ul>

<blockquote>
<p><strong>«ایران یعنی مجموعه‌ای از انسان‌ها که از حقوق مالکیت همدیگر دفاع می‌کنند — و این، زیباترین تعریف ملت است.»</strong><br/>
— محمدعلی جنت‌خواه</p>
</blockquote>

<h2>جمع‌بندی: ایران و مأموریت آزادی</h2>

<p>ایران نه فقط خانه — بلکه <strong>مأموریت آزادی بشریت</strong> است. ما ایرانیان، وارثان کسانی هستیم که هزاران سال پیش فهمیدند دین = آزادی. امروز، این مأموریت بر دوش ماست: نه فقط آزادی ایران، بلکه نشان دادن به جهان که <strong>دین واقعی = آزادی واقعی</strong>.</p>

<p><strong>این میراث ماست — پخش کن تا ایران دوباره مهد آزادی شود 🕊️</strong></p>

<p><strong>خدا، آزادی، خانواده و میهن 🇮🇷</strong></p>
</div>',
       'flag', 30, 20, 1, 5
WHERE NOT EXISTS (SELECT 1 FROM chapters WHERE slug = 'iran-cradle-of-freedom-property-rights');
