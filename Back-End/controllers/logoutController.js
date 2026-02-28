// Logout Controller
export const logoutController = (req, res) => {
  try {
    // Cookie remove kar rahe hain
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,      // localhost par false, production par true
      sameSite: "none",
      expires: new Date(0), // expire immediately
      path: "/",
    });
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    res.status(200).json({
      message: "Logout successful",
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
      status: "failed",
      data: null,
    });
  }
};
