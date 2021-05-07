package dev.bbs.study.csw.controllers.user;

import dev.bbs.study.csw.dtos.UserDto;
import dev.bbs.study.csw.enums.RegisterResult;
import dev.bbs.study.csw.services.UserService;
import dev.bbs.study.csw.vos.RegisterVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@RequestMapping(value = "/user")
@SessionAttributes(UserDto.NAME)
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ModelAttribute(UserDto.NAME)
    private UserDto userDto() {
        return null;
    }

    @RequestMapping(
            value = "/user",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public String loginGet() {
        return "user/login";
    }

    @RequestMapping(
            value = "/user",
            method = RequestMethod.POST,
            produces = MediaType.TEXT_HTML_VALUE)
    public String loginPost() {
        return "user/login";
    }

    @RequestMapping(
            value = "/register",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public String registerGet(@ModelAttribute(UserDto.NAME) UserDto userDto) {
            if (userDto != null) {
                return "redirect:/";
            }
        return "user/register";
    }

    @RequestMapping(
            value = "/register",
            method = RequestMethod.POST,
            produces = MediaType.TEXT_HTML_VALUE)
    public String registerPost(
            @ModelAttribute(UserDto.NAME) UserDto userDto,
            RegisterVo registerVo,
            Model model) {
        if (userDto != null) {
            return "redirect:/";
        }
        this.userService.register(registerVo);
        if (registerVo.getResult() == RegisterResult.SUCCESS) {
            return "user/register.success";
        } else {
            model.addAttribute("vo", registerVo);
            return "user/register";
        }
    }


}
