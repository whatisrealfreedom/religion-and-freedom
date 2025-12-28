-- Add content_en column to chapters table for English translations
-- Note: This will fail silently if content_en already exists (SQLite doesn't support IF NOT EXISTS for ALTER TABLE)
-- We use a workaround: try to add it, ignore error if it exists
-- SQLite doesn't support IF NOT EXISTS for ALTER TABLE ADD COLUMN, so we'll just try to add it
-- If it fails, the column already exists and we can continue

-- Add column if it doesn't exist (SQLite workaround)
-- We'll use a pragma check, but since SQLite doesn't support conditional ALTER TABLE,
-- we'll just add it and ignore the error if it exists
ALTER TABLE chapters ADD COLUMN content_en TEXT;

-- Update Chapter 2 with comprehensive English translation
UPDATE chapters
SET content_en = '
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
    If traffic laws changed every day based on one person''s preference, society would fall into chaos. "Stability of rules" means the possibility of secure life.
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

  <h2>6) What Are Gödel''s Incompleteness Theorems? (Very Clear, Step-by-Step)</h2>

  <p>Kurt Gödel in 1931 proved two very important theorems about <strong>formal axiomatic systems</strong>; the same type of system we see in mathematics and logic.</p>

  <blockquote>
    <strong>Quick Reminder:</strong> A formal axiomatic system means a logical system that starts from a few <strong>fundamental principles</strong> and builds new results using <strong>mechanical inference rules</strong> (like geometry or arithmetic of natural numbers).
  </blockquote>

  <h3>6-1) Gödel''s First Incompleteness Theorem — Simple Version for Everyone</h3>
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

  <h3>6-2) Gödel''s Second Incompleteness Theorem — Simple Version</h3>
  <p>Under the same conditions, that system usually cannot prove <strong>its own consistency</strong> using its internal tools.</p>
  <blockquote>
    Very informal translation: To be sure that "this rulebook is not broken itself," you usually need to step one step outside and examine it from outside.
  </blockquote>

  <h3>6-3) Summary of Gödel in One Sentence</h3>
  <blockquote>
    No very strong logical system is simultaneously "100% complete" and "guaranteed non-contradictory from within itself."
  </blockquote>

  <h2>7) How Do We Understand Jannatkhah''s Theory Here? (Quick Reminder)</h2>
  <p>In the framework that Jannatkhah himself sets:</p>
  <ul>
    <li>The <strong>five principles</strong> (Tawhid, Prophethood, Resurrection, Justice, Imamate/Mahdism) are seen as "axioms."</li>
    <li>From these principles, a network of ethical/legal/social results is extracted.</li>
    <li>The ultimate goal of this network: protecting <strong>absolute property rights</strong> (body, mind, time, property) as the definition of "real freedom."</li>
  </ul>

  <h2>8) What Is the Connection Between Gödel and Jannatkhah''s Theory? (Clear and Transparent)</h2>

  <p>This section is very important for the ordinary reader: Gödel talks about "limitations of strong formal systems," and Jannatkhah also uses the language of "formal axiomatic system" to explain religion. So a natural conceptual connection is formed.</p>

  <h3>8-1) Conceptual Connection (Without Dispute)</h3>
  <ul>
    <li>Gödel says: Strong formal systems have limitations.</li>
    <li>Jannatkhah says: Religion can be seen as a stable principle-based system.</li>
    <li>So a serious question arises: <strong>If we see religion "like a strong formal system," do Gödel''s limitations apply to it?</strong></li>
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
    <li><strong>Religion is not a mechanical formal system like mathematics</strong>; therefore it does not fall exactly under Gödel''s theorems.</li>
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
          <td>No state/leader has the right to consider themselves owner of people''s lives and property</td>
          <td>If the state says "You belong to me," Tawhid says "No"</td>
        </tr>
        <tr>
          <td><strong>Adl (Justice)</strong></td>
          <td>Aggression is forbidden</td>
          <td>You have no right to touch another''s body/mind/time/property</td>
          <td>Intentional inflation means touching people''s property</td>
        </tr>
        <tr>
          <td><strong>Ma''ad (Resurrection)</strong></td>
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
    <strong>If we want to bring Jannatkhah''s exact quote about Gödel word-for-word:</strong>
    A timestamp or exact text of that section is needed so the quote is recorded completely correctly and without error.
  </blockquote>
</div>
'
WHERE id = 2;

-- Update Chapter 1 with English translation
UPDATE chapters
SET content_en = '
<div class="chapter-content">
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
      <p>Your life''s time belongs to you — not forced labor, not endless military service. You own the moments of your life.</p>
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
</div>
'
WHERE id = 1;

-- Update Chapter 3 with English translation
UPDATE chapters
SET content_en = '
<div class="chapter-content">
  <h2>Religion, the True Guardian of Freedom</h2>
  
  <p>In Jannatkhah''s view, religion is the greatest enemy of statism. Religious principles are defensive walls around human property rights.</p>

  <h3>How Does Religion Protect Freedom?</h3>
  
  <ul>
    <li><strong>Tawhid (Monotheism)</strong> prevents the state from becoming God</li>
    <li><strong>Ma''ad (Resurrection)</strong> terrifies oppressors with the impossibility of eternal existence</li>
    <li><strong>Mahdism</strong> directs society toward an ideal without coercion</li>
  </ul>

  <blockquote>
    "Religion did not come to bind humanity — religion came to free humanity from the bonds of governments, powers, and desires."
  </blockquote>

  <h3>Separation of Religion and Science</h3>
  
  <p>It separates religion and science: science for the material world, religion for preserving freedom. Mixing them brings false mysticism or pseudo-science.</p>

  <p><strong>The Result?</strong> A society where humans are truly free — not under the domination of the state, not ideology, not oppressive economics.</p>
</div>
'
WHERE id = 3;

-- Update Chapter 4 with English translation
UPDATE chapters
SET content_en = '
<div class="chapter-content">
  <h2>Application in Contemporary Iran</h2>
  
  <p>Today''s Iran is a victim of statism — but tomorrow''s Iran can be a model of real freedom.</p>

  <h3>Current Problems</h3>
  
  <ul>
    <li><strong>Inflation</strong> = Theft of property ownership</li>
    <li><strong>Censorship</strong> = Theft of mind ownership</li>
    <li><strong>Coercions</strong> = Theft of body and time ownership</li>
  </ul>

  <h3>Jannatkhah''s Solution</h3>
  
  <p>Shifting the discourse to "real religion = freedom." The society awaiting Mahdi is a society that awaits complete freedom — not a big state, but sacred property rights.</p>

  <blockquote>
    "This theory is real hope for Iran: a prosperous, free society, without inflation, without oppression — a place where humans are truly human."
  </blockquote>
</div>
'
WHERE id = 4;

-- Update Chapter 5 with English translation (Philosophical Analysis)
UPDATE chapters
SET content_en = '
<div class="chapter-content">
  <h2>Philosophical Analysis of Freedom</h2>
  
  <p>This chapter provides a deep examination of freedom in both Islamic and Western philosophical traditions, showing how Jannatkhah''s theory bridges these traditions.</p>

  <h3>Freedom in Islamic Philosophy</h3>
  
  <p>In Islamic thought, freedom is not merely the absence of constraints, but the positive exercise of will within the framework of divine justice. The concept of <strong>absolute property rights</strong> aligns with Islamic principles of justice and non-aggression.</p>

  <h3>Freedom in Western Philosophy</h3>
  
  <p>From Locke to Rothbard, Western philosophers have grappled with property rights and freedom. Jannatkhah''s theory provides a religious foundation for these same principles, showing that religion and liberty are not opposed but complementary.</p>

  <blockquote>
    "True freedom requires both the absence of coercion and the presence of just principles. Religion provides the latter, ensuring that freedom is not merely chaos but ordered liberty."
  </blockquote>

  <h3>The Synthesis</h3>
  
  <p>By grounding freedom in absolute property rights and showing how religious principles protect these rights, Jannatkhah creates a synthesis that transcends both Eastern and Western philosophical traditions.</p>
</div>
'
WHERE id = 5;

-- Update Chapter 6 with English translation (Divine Justice)
UPDATE chapters
SET content_en = '
<div class="chapter-content">
  <h2>Divine Justice and Human Rights</h2>
  
  <p>This chapter explores how the principle of justice in religion connects to absolute property rights and forms the foundation of human rights.</p>

  <h3>Justice as Non-Aggression</h3>
  
  <p>The principle of <strong>Adl (Justice)</strong> in religion means non-aggression: you have no right to violate another''s body, mind, time, or property. This is not merely a moral principle but a legal and philosophical foundation.</p>

  <h3>Divine Justice vs. Human Courts</h3>
  
  <p>While human courts may be corrupt or biased, the principle of <strong>Ma''ad (Resurrection)</strong> ensures that ultimate justice will be served. This provides a check on earthly power and a guarantee for the oppressed.</p>

  <blockquote>
    "When earthly courts fail, the idea of divine justice restrains oppression. No tyrant can escape ultimate accountability."
  </blockquote>

  <h3>Property Rights as Human Rights</h3>
  
  <p>By defining freedom as absolute property rights, Jannatkhah shows that human rights are not abstract concepts but concrete, defensible claims. Your body, mind, time, and property are yours by right — not by permission.</p>
</div>
'
WHERE id = 6;

-- Update Chapter 7 with English translation (Awaiting Society)
UPDATE chapters
SET content_en = '
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
'
WHERE id = 7;

-- Update Chapter 8 with English translation (Modern World)
UPDATE chapters
SET content_en = '
<div class="chapter-content">
  <h2>Freedom in the Modern World</h2>
  
  <p>This chapter applies Jannatkhah''s theory to the challenges of the digital age and globalization, showing how property rights must be defended in new contexts.</p>

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
'
WHERE id = 8;

-- Update Chapter 9 with English translation (Future of Freedom)
UPDATE chapters
SET content_en = '
<div class="chapter-content">
  <h2>The Future of Freedom</h2>
  
  <p>This chapter presents a forward-looking vision of freedom grounded in durable principles, showing how Jannatkhah''s theory provides a path forward for humanity.</p>

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
'
WHERE id = 9;

-- Update Chapter 10 with English translation (AI Age)
UPDATE chapters
SET content_en = '
<div class="chapter-content">
  <h1>Freedom in the Age of AI: Religion as Ethical Code</h1>

  <p>In the age of artificial intelligence, the fundamental question is: How can we program AI to be just and not violate human property rights? Jannatkhah has an interesting answer: <strong>religion as ethical code for machines</strong>.</p>

  <h2>The Problem with Today''s AI</h2>

  <p>Today''s AI faces serious problems:</p>

  <ul>
    <li><strong>Lack of stable ethical framework:</strong> AI without fixed ethical principles can become a tool of oppression</li>
    <li><strong>Dependence on programmers:</strong> Programmers'' values can influence AI</li>
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
        <td><strong>Ma''ad (Resurrection)</strong></td>
        <td>Every AI action must be traceable and accountable</td>
        <td>Complete transparency in AI decision-making</td>
      </tr>
      <tr>
        <td><strong>Nubuwwah (Prophethood)</strong></td>
        <td>AI must follow just models (like prophets'' behavior)</td>
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

  <p>In the age of artificial intelligence, Jannatkhah''s theory is our guide for building just AI. Religion as ethical code can guarantee freedom in the future.</p>

  <blockquote>
    "Artificial intelligence can be the greatest threat or the greatest opportunity for freedom — the choice is ours. By translating religious principles into code, we can have just and freedom-enhancing AI."
  </blockquote>

  <p style="text-align: center; margin-top: 3rem; font-size: 1.25rem; color: #1a5fb4;">
    <strong>This chapter shows that Jannatkhah''s freedom theory is not just for today — it is for the future.</strong>
  </p>
</div>
'
WHERE id = 10;

