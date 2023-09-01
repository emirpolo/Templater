import { Templater } from './Templater';

let template, text, result;
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Templater</h1>`;

text = 'Sr. Emiro Arrieta se le ha consignado $100.000 COP - Fecha: 31/08/2023';

// Test 1.  default Token: {}
template = 'Sr. {user} se le ha consignado ${amount} COP - Fecha: {date}';

let templater = new Templater({
  template,
});

result = templater.test(text);

print(template, text, result);

// Test 2. custon Toke: {{}}

template = 'Sr. {{user}} se le ha consignado ${{amount}} COP - Fecha: {{date}}';

result = new Templater({
  tokenStart: '{{',
  tokenEnd: '}}',
  template,
}).test(text);

print(template, text, result);

// Test 2. custon Toke: [[]]
template =
  '[[userName]] se le ha consignado [[amount]] - Fecha: [[paymentDate]]';
text = 'Sr. Jhon Snow se le ha consignado $100,000.00 COP - Fecha: 31/08/2023';

result = new Templater({
  tokenStart: '[[',
  tokenEnd: ']]',
  template,
}).test(text);

print(template, text, result);

// Write TypeScript code!

function print(template, text, result) {
  console.log({ template, text, result });

  appDiv.innerHTML += `<p>
  <b>Template:</b> ${template} <br/>
  <b>Text:</b> ${text} <br/>
  <b>Results:</b> <pre>${JSON.stringify(result, null, 3)}</pre>
  </p>`;
}
