@echo off

del ..\\services\\mqttMsgConfig.d.ts

set "mydir=%~dp0"


for %%a in (*.json) do (
json2ts %%a >> ..\\services\\mqttMsgConfig.d.ts
)

cd %mydir%
