import { RSA_NO_PADDING } from 'constants';
import { ResolveOptions } from 'dns';
import { Request, Response, NextFunction } from 'express';

class TestController {
  public test(req: Request, res: Response, next: NextFunction): void {
    const testMessage = 'Testingggggg';
    res.send({ message: testMessage });
  }
}

export default TestController;