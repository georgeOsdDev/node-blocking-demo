# Demo for blocking behaviour of Node.js `fs` module with Azure Functions Node Language Worker

## Application Setting
[`FUNCTIONS_WORKER_PROCESS_COUNT`](https://learn.microsoft.com/en-us/azure/azure-functions/functions-app-settings#functions_worker_process_count) as 1(default)


`TimerTrigger1`
Executed every 1 min(`"0 */1 * * * *"`)

Basically this funcion invocation finish in 10 seconds
```
[2023-05-16T11:16:00.024Z] [Timer1 start] 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 2023-05-16T11:16:00.019Z
[2023-05-16T11:16:01.023Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 1, 2023-05-16T11:16:01.021Z
[2023-05-16T11:16:02.027Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 2, 2023-05-16T11:16:02.023Z
[2023-05-16T11:16:03.030Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 3, 2023-05-16T11:16:03.027Z
[2023-05-16T11:16:04.038Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 4, 2023-05-16T11:16:04.035Z
[2023-05-16T11:16:05.039Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 5, 2023-05-16T11:16:05.036Z
[2023-05-16T11:16:06.039Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 6, 2023-05-16T11:16:06.038Z
[2023-05-16T11:16:07.043Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 7, 2023-05-16T11:16:07.040Z
[2023-05-16T11:16:08.046Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 8, 2023-05-16T11:16:08.043Z
[2023-05-16T11:16:09.048Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 9, 2023-05-16T11:16:09.045Z
[2023-05-16T11:16:10.052Z] Loop of 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 10, 2023-05-16T11:16:10.047Z
[2023-05-16T11:16:10.053Z] [Timer1 end]: 681b35bb-5e8f-4746-bbad-1d1fc10a7175, 2023-05-16T11:16:10.049Z
[2023-05-16T11:16:10.055Z] Executed 'Functions.TimerTrigger1' (Succeeded, Id=681b35bb-5e8f-4746-bbad-1d1fc10a7175, Duration=10047ms)
```

`TimerTrigger2`
Executed every 3 min(`"5 */3 * * * *"`)

This function use `fs` sync methods for blocking.
Thus loop of `TimerTrigger1` will be blocked during `TimerTrigger2` is executing.

```
[2023-05-16T11:18:00.005Z] Executing 'Functions.TimerTrigger1' (Reason='Timer fired at 2023-05-16T11:18:00.0041685+00:00', Id=4e1b4b17-4c21-4ad7-9150-b4148d794ba9)
[2023-05-16T11:18:00.021Z] [Timer1 start] 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 2023-05-16T11:18:00.016Z
[2023-05-16T11:18:01.022Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 1, 2023-05-16T11:18:01.019Z
[2023-05-16T11:18:02.023Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 2, 2023-05-16T11:18:02.020Z
[2023-05-16T11:18:03.022Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 3, 2023-05-16T11:18:03.020Z
[2023-05-16T11:18:04.023Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 4, 2023-05-16T11:18:04.021Z
[2023-05-16T11:18:05.000Z] Executing 'Functions.TimerTrigger2' (Reason='Timer fired at 2023-05-16T11:18:04.9991852+00:00', Id=c2aa91c4-31d3-416f-8307-091da5a32caf)
[2023-05-16T11:18:06.586Z] [Timer2(blocking) start] c2aa91c4-31d3-416f-8307-091da5a32caf, 2023-05-16T11:18:05.011Z
[2023-05-16T11:18:06.586Z] [Timer2(blocking) end] c2aa91c4-31d3-416f-8307-091da5a32caf, 3000, 2023-05-16T11:18:06.584Z
[2023-05-16T11:18:06.588Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 5, 2023-05-16T11:18:06.586Z
[2023-05-16T11:18:06.588Z] Executed 'Functions.TimerTrigger2' (Succeeded, Id=c2aa91c4-31d3-416f-8307-091da5a32caf, Duration=1589ms)
[2023-05-16T11:18:07.593Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 6, 2023-05-16T11:18:07.590Z
[2023-05-16T11:18:08.594Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 7, 2023-05-16T11:18:08.593Z
[2023-05-16T11:18:09.596Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 8, 2023-05-16T11:18:09.595Z
[2023-05-16T11:18:10.601Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 9, 2023-05-16T11:18:10.600Z
[2023-05-16T11:18:11.604Z] Loop of 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 10, 2023-05-16T11:18:11.600Z
[2023-05-16T11:18:11.605Z] [Timer1 end]: 4e1b4b17-4c21-4ad7-9150-b4148d794ba9, 2023-05-16T11:18:11.601Z
[2023-05-16T11:18:11.607Z] Executed 'Functions.TimerTrigger1' (Succeeded, Id=4e1b4b17-4c21-4ad7-9150-b4148d794ba9, Duration=11603ms)
```

`TimerTrigger3`
Executed every 5 min(`"5 */5 * * * *"`)

This function use `fs` async methods for *Non*-blocking.
Thus loop of `TimerTrigger1` will not be blocked during `TimerTrigger3` is executing.

```
[2023-05-16T11:20:00.004Z] Executing 'Functions.TimerTrigger1' (Reason='Timer fired at 2023-05-16T11:20:00.0044705+00:00', Id=7323afdc-a412-4753-890d-48fde8928772)
[2023-05-16T11:20:00.010Z] [Timer1 start] 7323afdc-a412-4753-890d-48fde8928772, 2023-05-16T11:20:00.009Z
[2023-05-16T11:20:01.012Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 1, 2023-05-16T11:20:01.010Z
[2023-05-16T11:20:02.016Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 2, 2023-05-16T11:20:02.014Z
[2023-05-16T11:20:03.018Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 3, 2023-05-16T11:20:03.016Z
[2023-05-16T11:20:04.020Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 4, 2023-05-16T11:20:04.017Z
[2023-05-16T11:20:05.002Z] Executing 'Functions.TimerTrigger3' (Reason='Timer fired at 2023-05-16T11:20:05.0020431+00:00', Id=3f9ada7f-76f5-40a2-8d4e-d1477a9997d5)
[2023-05-16T11:20:05.018Z] [Timer3(Non blocking) start] 3f9ada7f-76f5-40a2-8d4e-d1477a9997d5, 2023-05-16T11:20:05.012Z
[2023-05-16T11:20:05.022Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 5, 2023-05-16T11:20:05.018Z
[2023-05-16T11:20:06.018Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 6, 2023-05-16T11:20:06.017Z
[2023-05-16T11:20:07.018Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 7, 2023-05-16T11:20:07.017Z
[2023-05-16T11:20:08.018Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 8, 2023-05-16T11:20:08.017Z
[2023-05-16T11:20:09.018Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 9, 2023-05-16T11:20:09.017Z
[2023-05-16T11:20:10.019Z] Loop of 7323afdc-a412-4753-890d-48fde8928772, 10, 2023-05-16T11:20:10.017Z
[2023-05-16T11:20:10.019Z] [Timer1 end]: 7323afdc-a412-4753-890d-48fde8928772, 2023-05-16T11:20:10.017Z
[2023-05-16T11:20:10.020Z] Executed 'Functions.TimerTrigger1' (Succeeded, Id=7323afdc-a412-4753-890d-48fde8928772, Duration=10015ms)
[2023-05-16T11:20:13.704Z] [Timer3(Non blocking) end] 3f9ada7f-76f5-40a2-8d4e-d1477a9997d5, 3000, 2023-05-16T11:20:13.703Z
[2023-05-16T11:20:13.705Z] Executed 'Functions.TimerTrigger3' (Succeeded, Id=3f9ada7f-76f5-40a2-8d4e-d1477a9997d5, Duration=8702ms)
```
