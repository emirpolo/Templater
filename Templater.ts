interface ITemplaterOptions {
  template: string;
  tokenStart?: string;
  tokenEnd?: string;
}

export class Templater {
  private regExp: RegExp;
  private token: RegExp;

  constructor(options = {} as ITemplaterOptions) {
    const { tokenStart = '{', tokenEnd = '}', template } = options;

    this.setTokenParts(tokenStart, tokenEnd);
    this.setTemplate(template);
  }

  private setTemplate(template) {
    this.regExp = new RegExp(this.replace(this.escape(template)));
  }

  private setTokenParts(start, end) {
    const t = '\\\\\\';
    const s = start.split('').join(t);
    const e = end.split('').join(t);

    this.token = RegExp(`${t}${s}([^${t}${e}]*?)\s*${t}${e}`, 'g');
  }

  private escape(template) {
    return template.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  private replace(template) {
    return template.replace(this.token, (token, name) => `(?<${name}>.*)`);
  }

  // Public Methods
  public test(text) {
    return this.regExp.exec(String(text))?.groups;
  }
}
