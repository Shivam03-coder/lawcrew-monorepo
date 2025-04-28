import { Response } from "express";

export class GlobalUtils {
  public static setCookie = (
    res: Response,
    name: string,
    value: string,
    httpOnly: boolean = true,
    options?: Record<string, any>
  ): void => {
    res.cookie(name, value, {
      httpOnly,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      ...options,
    });
  };
  public static setMultipleCookies = (
    res: Response,
    cookies: {
      name: string;
      value: string;
      httpOnly?: boolean;
      options?: Record<string, any>;
    }[]
  ): void => {
    cookies.forEach(({ name, value, httpOnly = false, options }) => {
      GlobalUtils.setCookie(res, name, value, httpOnly, options);
    });
  };

  public static clearMultipleCookies = (
    res: Response,
    cookieNames: string[]
  ) => {
    cookieNames.forEach((name) => res.clearCookie(name));
  };
}
