# Style inputs

**Style inputs.**

**Requirements**
1. Inputs should have 2 possible color variants: primary and secondary.
2. Inputs should have 3 possible sizes: small, medium, and large.
3. Inputs should have focus states.
4. Every input should have a label and a placeholder.

**Dev notes**
1. Focus states should be implemented with :focus-visible pseudo-class and changed outline property (think why not a border).
2. Sizes should be implemented by changing the padding and font-size of the input.
3. In the result, the small input element should have a class list something like this class=“input input-primary input-small”.
4. (Optional) You can use the nesting selector & to reference the parent selector. So instead of writing .input-primary:focus-visible, you can use &:focus-visible inside a .input-primary selector. **Docs:** https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector.
5. Try to do your best, if you get some concerns, we will break down this homework during the practical class:).

> **PS:** I really hope that I have completed **all** the requirements.
