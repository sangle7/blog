……其实我是学生物的

期末论文里基因组比对时用到了MUMmer，本来以为很简单没想到还是有挺多坑的，折腾了半天才拿到数据，也算是记录一下为以后可能会写的生信论文做个准备吧。

## MUMmer

MUMmer是用于快速比对非常大的DNA 氨基酸序列的开源软件包。它的[主页](http://mummer.sourceforge.net/)在这里。

它在[github](https://github.com/mummer4/mummer)上最新的版本是v4，但它的官方文档还停留在v3，但其实大多都说的比较清楚了，API也没有太大的变化。

## 安装

### 系统要求

MUMmer主要用C和C ++编写。它可以移植到任何使用C ++编译器的系统上，但是分发专门设计为使用GNU GCC编译器进行编译，并已在以下平台上成功测试：

- Redhat Linux 6.2 and 7.3 (Pentium 4)
- Compaq Tru64 UNIX 5.1 (alpha)
- SunOS UNIX 5.8 (sparc)
- Mac OS X 10.2.8 (PowerPC G4`

### 依赖

MUMmer还需要一些第三方软件来成功运行。在没有一个或多个以下实用程序的情况下，某些MUMmer程序可能无法正常运行。括号中列出了用于测试MUMmer软件包的版本。这些版本或后续版本应确保各种MUMmer程序的正确执行。这些实用程序必须添加到环境变量：

+ make（GNU make 3.79.1）
+ perl（PERL 5.6.0）
+ sh（GNU sh 1.14.7）
+ csh（tcsh 6.10.00）
+ g ++（GNU gcc 2.95.3）
+ sed（GNU sed 3.02）
+ awk（GNU awk 3.0.4）
+ ar（GNU ar 2.9.5）

### 可选附加软件

对于运行MUMmer可视化程序，需要这些额外的系统实用程序：

+ fig2dev (fig2dev 3.2.3)
+ gnuplot (gnuplot 4.0)
+ xfig    (xfig 3.2)

### 编译和安装

```powershell
./configure --prefix=/path/to/installation
make
make install
```

如果`--prefix`被省略，则软件安装在`/usr/ local`中。 如果在系统位置安装，可能需要`sudo make install`。

### 坑

1. 如果安装错了路径想重新安装,记得先要`make clean`才能重装
2. 添加环境变量的最简单方式:`export PATH=$PATH:/yourpath`,可以用`export`命令检查是否成功添加

## 运行

我在论文中用到的是NUCmer,所以就以它为例，其他几个命令的用法在文档中都有很详细的说明。

### 数据来源

在我的论文中使用了*Nanorana parkeri* 和*Gekko japonicus*的全基因组序列，数据全部来源于[NCBI](https://www.ncbi.nlm.nih.gov/)

### 运行

使用NUCmer生成文件：

`nucmer [options] <reference file> <query file>` 

使用show-coords将nucmer.delta文件对齐成 nucmer.coords ：

`show-coords -r -c -l nucmer.delta > nucmer.coords`

###  可视化

`mapview -n 1 -p mapview nucmer.coords`

可生成需要用matlab打开的\*.fig格式文件

`mapview -n 1 -f pdf -p mapview promer.coords`

可生成PDF格式

### 坑

1. 运行nucmer时报错：`nucmer: error while loading shared libraries: libumdmummer.so.0: cannot open shared object file: No such file or directory`：重装MUMmer并且带上这个参数：`make install CPPFLAGS="-O3 -DSIXTYFOURBITS"`
2. 无法生成文件：参考[http://mummer.sourceforge.net/examples/](http://mummer.sourceforge.net/examples/) 中的示例，使用`nucmer -maxmatch -c 100 -p nucmer A.fasta B.fasta`
3. 可视化步骤中如果没有文件生成，可能是由于其所需的附加软件没有安装好，检查依赖并重新安装。

