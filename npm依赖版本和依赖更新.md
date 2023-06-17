# npm依赖版本和依赖更新

```json
{
  "dependencies": {
    "uni-read-pages": "^1.0.5",
    "uni-simple-router": "^2.0.7"
  }
}
```

**npm依赖版本分为三部分，通过 `.` 进行分隔**

第一个代表主要版本号，如果依赖进行了破坏性更新不会向下兼容，比如函数传参变化、返回值变化等等都会去更新主要版本号

第二个代表次要版本号，主要是进行新功能开发并且向下兼容

第三个表示补丁版本，修改bug的工作

**版本号前面还有符号，例如 `^` `~` `*`** 

^表示会接收次要版本的更新

~表示只接受补丁更新

*表示接受任何版本的更新

**安装指定版本的依赖**

在依赖后面加上希望安装的版本号通过 `@` 连接

```powershell
npm i vue@2
```

**检查项目依赖的最新版本**

```powershell
npm outdated
```

Package            Current  Wanted        Latest  Location                        Depended by
uni-simple-router    2.0.7   2.0.7  2.0.8-beta.4  node_modules/uni-simple-router  uniapp

会返回上面类似的数据，可以看到对应信息，这里会根据你版本号前面的符号去筛选，如果你指定只是安装补丁，那么就只会找到最新的补丁版本。

**更新依赖**

```powershell
npm update [依赖名称]
```

根据 wanted 下面的版本进行更新

npm i 时 package.json 版本优先

npm ci 必须有 package-lock.json，然后按照package-lock.json 版本安装，没有package-lock.json会报错