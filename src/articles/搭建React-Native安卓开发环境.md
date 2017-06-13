最近刚好想尝试一下新方向，所以这两天花了点时间用RN做了一个展示类的app，总结一下安卓开发环境的搭建和容易踩的坑。

**以下部分文字来自[React-Native官方文档](https://facebook.github.io/react-native/)**

### Chocolatey（可选）

一个Windows上的包管理器。

你可以通过它安装python2和nodejs。也可以分别到对应网站下载安装。

###  python2

```
choco install python2
```

**注意目前不支持Python 3版本。如果你以前安装过python3，记得修改环境变量**

如果一切顺利，在命令提示行输入python应该会有如下提示：

![python2](http://onvaoy58z.bkt.clouddn.com/python2.JPG)

### Node

```
choco install nodejs.install
```

**注意，目前已知Node 7.1版本在windows上无法正常工作，请避开这个版本！**

同样，记得将node添加到环境变量。

如果一切顺利，在命令提示行输入`node -v`应该可以查看node的版本号，同时，输入`npm -v`可查看npm的版本号。

### The React Native CLI 

```
npm install -g react-native-cli
```

### 安卓开发环境

#### 下载安装Android Studio

[Android Studio](http://developer.android.com/sdk/index.html)提供了开发所需的安卓SDK以及模拟器

**注意：React Native目前需要[Android Studio](http://developer.android.com/sdk/index.html)2.0或更高版本。**

> Android Studio需要Java Development Kit [JDK] 1.8或更高版本。你可以在命令行中输入`javac -version`来查看你当前安装的JDK版本。如果版本不合要求，则可以到 [官网](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)上下载。 或是使用包管理器来安装（比如`choco install jdk8`或是 `apt-get install default-jdk`）
>
> 除非特别注明，请不要改动安装过程中的选项。比如Android Studio默认安装了 `Android Support Repository`，而这也是React Native必须的（否则在react-native run-android时会报appcompat-v7包找不到的错误）。

#### 安装AVD以及HAXM

第一次运行 Android Studio时，选择`Custom` 安装方式，勾选下列选项：

- `Android SDK`
- `Android SDK Platform`
- `Performance (Intel ® HAXM)`
- `Android Virtual Device`

#### 安装Android 6.0 (Marshmallow) SDK

1. 在Android Studio的欢迎界面中选择`Configure | SDK Manager`。
2. 在`SDK Platforms`窗口中，选择`Show Package Details`，然后在`Android 6.0 (Marshmallow)`中勾选`Google APIs`、`Android SDK Platform 23`、`Intel x86 Atom System Image`、`Intel x86 Atom_64 System Image`以及`Google APIs Intel x86 Atom_64 System Image`。
3. 在`SDK Tools`窗口中，选择`Show Package Details`，然后在`Android SDK Build Tools`中勾选`Android SDK Build-Tools 23.0.1`（必须是这个版本）。然后还要勾选最底部的`Android Support Repository`.
4. 保存修改，安装所需SDK。

#### ANDROID_HOME 环境变量

确保`ANDROID_HOME`环境变量正确地指向了你安装的Android SDK的路径。

#### 将Android SDK的Tools目录添加到`PATH`变量中

你可以把Android SDK的tools和platform-tools目录添加到`PATH`变量中，以便在终端中运行一些Android工具，例如`android avd`或是`adb logcat`等。

#### 使用真实设备调试

1. 将设备用数据线连接到电脑

2. 确保已安装驱动

3. 在命令行中输入`adb devices`查看设备是否已连接，出现如下指令表示连接成功。

   ![adb](http://onvaoy58z.bkt.clouddn.com/adbdevices.JPG)

   如果提示adb不是可用命令，将其添加到环境变量即可。

   **注意：应该有且只有一个adb device，否则调试时会报错**

### 测试开发环境

在命令行中输入以下指令

```
react-native init AwesomeProject
cd AwesomeProject
react-native start
```

**不要在命令行默认的System32目录中init项目！会有各种权限限制导致不能运行！**

第一次会联网下载所需包，等待几分钟即可。直到出现react packager命令行。

**新建**一个命令行，输入

```
react-native run-android

```

稍等片刻，手机就会开始运行你的app。

![](https://facebook.github.io/react-native/img/AndroidSuccess.png)

如果没有开始运行，检查是否开启了悬浮窗权限。

此外，大部分国产手机需要额外安装SDK才能运行，请自行搜索[stackoverflow](http://stackoverflow.com/)

**至此，你已经成功搭建了React-Native的安卓开发环境，可以对项目进行修改了**

- 使用你喜欢的文本编辑器打开`index.android.js`并随便改上几行
- 按两下R键，或是用Menu键打开开发者菜单，然后选择 *Reload JS* 就可以看到你的最新修改。（没有menu键的可以摇晃手机）

如果你在搭建中遇到任何问题，可以参考[trouble shooting](https://facebook.github.io/react-native/docs/troubleshooting.html#content)

