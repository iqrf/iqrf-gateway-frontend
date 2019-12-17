@echo off

del ..\\services\\wsConfig.d.ts

set "mydir=%~dp0"


for %%a in (*.json) do (
json2ts %%a >> ..\\services\\wsConfig.d.ts
)

cd %mydir%
