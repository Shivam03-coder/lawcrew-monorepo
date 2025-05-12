import {
  FileText,
  FileSignature,
  Handshake,
  Briefcase,
  Landmark,
  ScrollText,
  Gem,
  Shield,
  Plus,
} from "lucide-react";

export const TEMPLATES = [
  {
    title: "Shareholders Agreement",
    category: "Corporate",
    icon: <Handshake className="h-8 w-8" />,
    initialContent: `
<h1>SHAREHOLDERS AGREEMENT</h1>
<p><strong>THIS SHAREHOLDERS AGREEMENT</strong> is made on [DATE]</p>
<h3>BETWEEN:</h3>
<ol>
  <li>[SHAREHOLDER 1 NAME], residing at [ADDRESS]</li>
  <li>[SHAREHOLDER 2 NAME], residing at [ADDRESS]</li>
</ol>
<p><em>(Collectively "the Shareholders")</em></p>

<h3>WHEREAS</h3>
<p>The parties wish to regulate their relationship as shareholders of [COMPANY NAME]...</p>

<h2>1. SHARE TRANSFER RESTRICTIONS</h2>
<p>1.1 No Shareholder shall transfer any shares without first offering them to existing Shareholders pro-rata...</p>

<h2>2. DIVIDEND POLICY</h2>
<p>2.1 The Company shall declare dividends annually subject to retained earnings...</p>
`,
  },
  {
    title: "Mutual Divorce Petition",
    category: "Family",
    icon: <FileSignature className="h-8 w-8" />,
    initialContent: `
<h1>PETITION FOR DIVORCE BY MUTUAL CONSENT</h1>
<p><strong>IN THE FAMILY COURT OF [STATE]</strong><br>
Case No: [NUMBER]</p>

<p>We, [HUSBAND NAME] and [WIFE NAME], married on [DATE] at [LOCATION], state:</p>

<ol>
  <li>We have lived separately since [DATE] (more than 12 months)</li>
  <li>Our marriage has irretrievably broken down</li>
  <li>We have mutually agreed to:
    <ul>
      <li>Child custody arrangements [DESCRIBE]</li>
      <li>Division of assets [DESCRIBE]</li>
    </ul>
  </li>
</ol>

<p><strong>WHEREFORE</strong>, we respectfully pray for dissolution of our marriage...</p>
`,
  },
  {
    title: "Employment Agreement",
    category: "Employment",
    icon: <Briefcase className="h-8 w-8" />,
    initialContent: `
<h1>EMPLOYMENT CONTRACT</h1>
<p>Effective: [DATE]</p>

<h3>Between:</h3> 
<p>[EMPLOYER NAME] ("Company")<br>
And: [EMPLOYEE NAME] ("Employee")</p>

<h2>1. POSITION</h2>
<p>Employee shall serve as [JOB TITLE] with duties including:</p>
<ul>
  <li>[KEY RESPONSIBILITY 1]</li>
  <li>[KEY RESPONSIBILITY 2]</li>
</ul>

<h2>2. COMPENSATION</h2>
<p>2.1 Base Salary: ₹[AMOUNT] per month<br>
2.2 Bonus: Discretionary performance bonus up to [%] of salary...</p>
`,
  },
  {
    title: "GST Consultant Agreement",
    category: "Tax",
    icon: <Landmark className="h-8 w-8" />,
    initialContent: `
<h1>GST COMPLIANCE SERVICES AGREEMENT</h1>
<p>This Agreement between [BUSINESS NAME] ("Client") and [CONSULTANT NAME] ("Consultant"):</p>

<h2>SCOPE OF SERVICES</h2>
<p>Consultant shall:</p>
<ul>
  <li>✓ File monthly/quarterly GST returns (GSTR-1, GSTR-3B)</li>
  <li>✓ Maintain GST compliance records</li>
  <li>✓ Represent Client before tax authorities</li>
</ul>

<h2>FEES</h2>
<p>₹[AMOUNT] per filing + ₹[AMOUNT]/hour for advisory services...</p>
`,
  },
  {
    title: "Trademark License Agreement",
    category: "IP",
    icon: <Shield className="h-8 w-8" />,
    initialContent: `
<h1>TRADEMARK LICENSE AGREEMENT</h1>
<p>Granted by: [OWNER COMPANY] ("Licensor")<br>
To: [LICENSEE COMPANY] ("Licensee")</p>

<h2>1. LICENSED MARK</h2>
<p>Registration No. [TM NUMBER] for "[TRADEMARK]" in Class [NUMBER]</p>

<h2>2. ROYALTIES</h2>
<p>2.1 Licensee shall pay [%] of net sales or ₹[AMOUNT] per unit sold<br>
2.2 Quarterly payments due within 15 days of quarter end...</p>
`,
  },
  {
    title: "Lease Agreement",
    category: "Property",
    icon: <ScrollText className="h-8 w-8" />,
    initialContent: `
<h1>RESIDENTIAL LEASE AGREEMENT</h1>
<p>Property: [FULL ADDRESS]<br>
Landlord: [NAME]<br>
Tenant: [NAME]</p>

<h2>TERMS:</h2>
<ol>
  <li>Term: 11 months commencing [DATE]</li>
  <li>Rent: ₹[AMOUNT] payable by 5th of each month</li>
  <li>Security Deposit: ₹[AMOUNT] (refundable)</li>
</ol>

<h2>TENANT COVENANTS:</h2>
<ul>
  <li>✓ No structural alterations</li>
  <li>✓ No subletting without consent</li>
  <li>✓ Maintain utilities in tenant's name</li>
</ul>
`,
  },
  {
    title: "Power of Attorney",
    category: "Legal",
    icon: <Gem className="h-8 w-8" />,
    initialContent: `
<h1>SPECIAL POWER OF ATTORNEY</h1>
<p>Know all men by these presents that I, [PRINCIPAL NAME], appoint [AGENT NAME] as my true attorney:</p>

<h2>GRANTED POWERS:</h2>
<ol>
  <li>To operate bank accounts with [BANK NAMES]</li>
  <li>To execute sale deeds for property at [ADDRESS]</li>
  <li>To represent before tax authorities</li>
</ol>

<p>This POA remains valid until [DATE] unless revoked earlier...</p>
`,
  },
  {
    title: "Last Will and Testament",
    category: "Estate",
    icon: <FileSignature className="h-8 w-8" />,
    initialContent: `
<h1>LAST WILL AND TESTAMENT OF [YOUR NAME]</h1>
<p>I, [NAME], declare this to be my Will:</p>

<h2>1. EXECUTOR</h2>
<p>I appoint [EXECUTOR NAME] as executor.</p>

<h2>2. BEQUESTS</h2>
<p>2.1 To my spouse: [DESCRIPTION OF ASSETS]<br>
2.2 To my children: [DESCRIPTION] in equal shares</p>

<h2>3. RESIDUARY ESTATE</h2>
<p>All remaining assets to [BENEFICIARY]...</p>
`,
  },
  {
    title: "Cross Border NDA",
    category: "Corporate",
    icon: <Shield className="h-8 w-8" />,
    initialContent: `
<h1>CONFIDENTIALITY AGREEMENT</h1>
<p>Between: [COMPANY A] (USA) and [COMPANY B] (India)</p>

<h2>1. DEFINITIONS</h2>
<p>"Confidential Information" means all non-public business, technical, or financial information disclosed between [DATE] to [DATE].</p>

<h2>2. OBLIGATIONS</h2>
<p>2.1 Recipient shall:</p>
<ul>
  <li>Use information only for [PURPOSE]</li>
  <li>Maintain at least reasonable care protections</li>
  <li>Not disclose to third parties for 3 years</li>
</ul>
`,
  },
  {
    title: "Master Service Agreement",
    category: "Business",
    icon: <Handshake className="h-8 w-8" />,
    initialContent: `
<h1>MASTER SERVICES AGREEMENT</h1>
<p>Effective: [DATE]</p>

<h3>BETWEEN:</h3> 
<p>[CLIENT] ("Customer")<br>
AND: [VENDOR] ("Service Provider")</p>

<h2>1. SERVICES</h2>
<p>As described in attached Statement of Work (SOW).</p>

<h2>2. TERM</h2>
<p>Initial term of 24 months, auto-renewing for 12-month periods unless terminated with 60 days notice.</p>

<h2>3. PAYMENT TERMS</h2>
<p>Net 30 days from invoice date. Late payments accrue interest at 1.5% monthly...</p>
`,
  },
];