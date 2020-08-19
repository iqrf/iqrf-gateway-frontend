@echo off

del ..\\services\\mqttConfig.d.ts

set "mydir=%~dp0"


for %%a in (*.json) do (
json2ts %%a >> ..\\services\\mqttConfig.d.ts
)

cd %mydir%
